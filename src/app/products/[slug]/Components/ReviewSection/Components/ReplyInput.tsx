import { ProductDetailsClient, Review } from "../../../types";
import type { useMentionSuggestion } from "../features/mention-suggestion/hook/useMentionSuggestion";
import { MentionSuggestion } from "../features/mention-suggestion/MentionSuggestion";

type ReplyInputProps = {
  handleReplyReset: () => void;
  handleReplySubmit: (e: React.FormEvent<HTMLFormElement>,reviewId:ProductDetailsClient["reviews"]["reviewData"]["data"][number]["reviewId"]) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  reviewId: Review["reviewId"];
  mentionSuggestion: ReturnType<
    typeof useMentionSuggestion
  >["mentionSuggestion"];
  handleKeyDown: ReturnType<typeof useMentionSuggestion>["handleKeyDown"];
  popupRef: React.RefObject<HTMLUListElement | null>;
};

export function ReplyInput({
  handleReplyReset,
  handleReplySubmit,
  inputRef,
  handleQueryChange,
  query,
  reviewId,
  mentionSuggestion,
  handleKeyDown,
  popupRef,
}: ReplyInputProps) {
  return (
    <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-200">
      <form
        onReset={handleReplyReset}
        onSubmit={(e)=>handleReplySubmit(e,reviewId)}
        className="space-y-3"
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            onChange={handleQueryChange}
            value={query}
            aria-autocomplete="list"
            placeholder="Write your reply..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            aria-controls={`suggestion-list-${reviewId}`}
            aria-activedescendant={
              mentionSuggestion.showList && mentionSuggestion.selectedIndex
                ? String(mentionSuggestion.selectedIndex)
                : undefined
            }
            onKeyDown={handleKeyDown}
            aria-expanded={
              mentionSuggestion.showList &&
              mentionSuggestion.filteredItems.length > 0
                ? true
                : false
            }
          />
          <MentionSuggestion
            mentionSuggestion={mentionSuggestion}
            popupRef={popupRef}
            suggestionListId={`suggestion-list-${reviewId}`}
          />
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            type="reset"
            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!query.trim()}
            className="px-6 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Reply
          </button>
        </div>
      </form>
    </div>
  );
}