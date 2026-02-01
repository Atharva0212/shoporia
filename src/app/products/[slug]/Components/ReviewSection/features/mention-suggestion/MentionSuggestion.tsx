import type { MentionSuggestionState, useMentionSuggestion } from "./hook/useMentionSuggestion";
import "./mention-suggestion.css";
import { MentionItem } from "./types";

type MentionSuggestionProps = {
  mentionSuggestion: MentionSuggestionState;
  popupRef:ReturnType<typeof useMentionSuggestion>["popupRef"];
  suggestionListId:`suggestion-list-${string}`
};

export function MentionSuggestion({
  mentionSuggestion,
  popupRef,
  suggestionListId,
}: MentionSuggestionProps) {
  if (
    !mentionSuggestion.showList ||
    mentionSuggestion.filteredItems.length === 0
  ) {
    return null;
  }
  
  return (
    <ul
      id={suggestionListId}
      ref={popupRef}
      className="absolute m-1 bg-white rounded-xl shadow-2xl border border-gray-200 w-60 max-h-80 overflow-y-auto z-50 animate-slideUp"
      tabIndex={-1}
      role="listbox"
      style={mentionSuggestion.styles}
    >
      {mentionSuggestion.filteredItems.map((item, index) => (
        <ListItem
          key={index}
          item={item}
          index={index}
          activedescendant={mentionSuggestion.selectedIndex}
        />
      ))}
    </ul>
  );
}

type ListItemProps = {
  item: MentionItem;
  index: number;
  activedescendant: number | null;
};

function ListItem({ item, index, activedescendant }: ListItemProps) {
  const isActive = activedescendant === index;
  return (
    <li
      role="option"
      key={item.id}
      data-index={index}
      aria-selected={isActive}
      className={`w-full flex items-center justify-between px-6 py-4 transition ${
        isActive ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
    >
      {/* User Info */}
      <div className="text-left">
        <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
      </div>

      {isActive && <span className="w-2 h-2 bg-gray-900 rounded-full"></span>}
    </li>
  );
}
