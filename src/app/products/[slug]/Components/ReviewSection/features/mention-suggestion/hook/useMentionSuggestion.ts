import { useCallback, useLayoutEffect, useRef, useState, type ChangeEvent } from "react";
import { isMentionStart } from "../utils/isMentionStart";
import { updateMentionAtCursor } from "../utils/replaceMention";
import { MentionItem } from "../types";

type UseMentionSuggestionOptions = {
    query: string,
    setQueryValue: (value: string) => void,
    inputRef: React.RefObject<HTMLInputElement | null>,
}

type ActiveMentionSuggestion = {
    filteredItems: MentionItem[];
    selectedIndex: number;
    mentionQuery: string;
    mentionPostion: MentionPostion;
    styles?: React.CSSProperties
};

type MentionPostion = | "top" | "bottom";

function dedupeMentions(mentionItems:MentionItem[]):MentionItem[]{
    console.log(mentionItems);
    
    const map=new Map([...mentionItems.map(item=>[item.id,item] as const)])
    return Array.from(map.values());
}

export type MentionSuggestionState =
    | { showList: false }
    | ({ showList: true } & ActiveMentionSuggestion);

export function useMentionSuggestion({ query, setQueryValue, inputRef }: UseMentionSuggestionOptions) {
    const [mentionSuggestion, setMentionSuggestion] =
        useState<MentionSuggestionState>({ showList: false });
    const [mentionItems, setMentionItems] = useState<MentionItem[]>([]);

    const popupRef = useRef<HTMLUListElement | null>(null);

    useLayoutEffect(() => {
        if (popupRef.current && mentionSuggestion.showList) {
            popupRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
            const selectedElement = popupRef.current.querySelector(
                `[data-index="${mentionSuggestion.selectedIndex}"]`
            );
            selectedElement?.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
    }, [mentionSuggestion]);

    const computeFilteredItems = useCallback(
        (query: string) => {
            if (!query) return [];
            const matches = mentionItems.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );

            return dedupeMentions(matches);
        },
        [mentionItems]
    );

    const getDropdownPosition = useCallback((): { success: true, mentionPosition: MentionPostion, styling: React.CSSProperties } | { success: false } => {
        if (!inputRef.current) return { success: false };
        const screenHeight = window.innerHeight;
        const { top: spaceAbove, bottom } = inputRef.current.getBoundingClientRect();
        const spaceBelow = screenHeight - bottom;
        const openUp = spaceAbove > spaceBelow;
        const dropdownPlacement = openUp
            ? { mentionPosition: "top" as const, styling: { bottom: "100%", marginBlockStart: "6px" } }
            : { mentionPosition: "bottom" as const, styling: { top: "100%", marginBlockEnd: "6px" } };

        return { success: true, ...dropdownPlacement };
    }, [inputRef])

    const handleQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setQueryValue(inputValue);
        const cursorPosition = e.target.selectionStart ?? 0;
        const atIndex = inputValue.lastIndexOf("@", cursorPosition);
        const mentionQuery = inputValue.slice(atIndex, cursorPosition);

        if (mentionSuggestion.showList) {
            const filteredItems = computeFilteredItems(mentionQuery);

            if (filteredItems.length === 0) {
                setMentionSuggestion({ showList: false });
                return;
            } else {
                setMentionSuggestion((prev) => {
                    return { ...prev, filteredItems, mentionQuery };
                });
                return;
            }
        }

        if (
            !mentionSuggestion.showList &&
            isMentionStart(inputValue, cursorPosition)
        ) {
            const filteredItems = computeFilteredItems(mentionQuery);
            if (filteredItems.length === 0) return;
            const dropdownPositionResult = getDropdownPosition();
            const isDropdownPositionTop = (() => {
                return (
                    dropdownPositionResult.success &&
                    dropdownPositionResult.mentionPosition === "top"
                );
            })();

            const orderedItems = isDropdownPositionTop ? [...filteredItems].reverse() : filteredItems;
            setMentionSuggestion({
                showList: true,
                selectedIndex: isDropdownPositionTop ? orderedItems.length - 1 : 0,
                filteredItems: orderedItems,
                mentionQuery: mentionQuery,
                mentionPostion: dropdownPositionResult.success ? dropdownPositionResult.mentionPosition : "bottom",
                ...(dropdownPositionResult.success ? { styles: dropdownPositionResult.styling } : {})
            });
        }
    }, [computeFilteredItems, getDropdownPosition, mentionSuggestion, setQueryValue])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        const keyboardEvents: Record<typeof e.key, () => void> = {
            ArrowUp: () => {
                e.preventDefault();
                setMentionSuggestion((prev) => {
                    if (!prev.showList) return { showList: false };
                    const { selectedIndex } = prev;
                    return {
                        ...prev,
                        selectedIndex: Math.max(selectedIndex - 1, 0),
                    };
                });
            },
            ArrowDown: () => {
                e.preventDefault();
                setMentionSuggestion((prev) => {
                    if (!prev.showList) return { showList: false };
                    const { selectedIndex, filteredItems } = prev;

                    return {
                        ...prev,
                        selectedIndex: Math.min(selectedIndex + 1, filteredItems.length - 1)
                    };
                });
            },
            Escape: () => {
                setMentionSuggestion({ showList: false });
            },
            Enter: () => {
                e.preventDefault();
                if (
                    !mentionSuggestion.showList ||
                    mentionSuggestion.selectedIndex == null
                )
                    return;
                const { selectedIndex, filteredItems } = mentionSuggestion;
                const selectedItem = filteredItems[selectedIndex];
                if (!selectedItem) return;
                const cursorPosition = e.currentTarget.selectionStart ?? 0;

                const updatedQuery = updateMentionAtCursor(
                    query,
                    cursorPosition,
                    selectedItem.name
                );
                setQueryValue(updatedQuery);
                setMentionSuggestion({ showList: false });
            },
        } as const;
        const handler = keyboardEvents[e.key as keyof typeof keyboardEvents];
        handler?.();
    }, [mentionSuggestion, query, setQueryValue])

    function closeMentionList() {
        setMentionSuggestion({ showList: false });
    }

    function updateMentionItems(newItems: MentionItem[]) {
        setMentionItems(newItems)
    }

    return { mentionSuggestion, popupRef, handleQueryChange, handleKeyDown, closeMentionList, updateMentionItems }
}
