import { Reply, Review } from "../../../types";
import { Avatar } from "./Avatar";

type ReplyModeType =
  | { isPending: true; reply: Omit<Reply, "createdAt"> }
  | {
      isPending: false;
      openReplyInput: (
        id: Review["reviewId"],
        userName: Reply["userName"],
      ) => void;
      reviewId: Review["reviewId"];
      reply: Reply;
    };

type CommentReplyProps = {
  replyMode: ReplyModeType;
};

export function CommentReply({ replyMode }: CommentReplyProps) {
  const { isPending, reply } = replyMode;
  const { id,comment, userName, avatarBg } = reply;
  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 p-4 rounded-xl border border-divider-200">
      <Avatar initial={userName[0]} avatarBg={avatarBg} />
      {/* Reply Content */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span
            onClick={() => {
              if (isPending) return;
              const { openReplyInput, reviewId } = replyMode;
              openReplyInput(reviewId, userName);
            }}
            className={`font-semibold text-text-900 text-body-sm $${isPending ? "opacity-70" : ""}`}
          >
            {userName}
          </span>
          {!isPending && (
            <span className="text-xs text-gray-500">
              {new Date(reply.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
        <p className="text-text-700 text-body-sm">{comment}{" "}{id}</p>
      </div>
    </div>
  );
}
