import { Reply, Review } from "../../../types";
import { Avatar } from "./Avatar";

export function CommentReply({
  reply,
  openReplyInput,
  reviewId,
}: {
  reply: Reply;
  openReplyInput: (id: Review["reviewId"], userName: Reply["userName"]) => void;
  reviewId: Review["reviewId"];
}) {
  const { createdAt, comment, userName,avatarBg } = reply;

  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 p-4 rounded-xl border border-divider-200">
      <Avatar initial={userName[0]} avatarBg={avatarBg}/>
      {/* Reply Content */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span
            onClick={() => openReplyInput(reviewId, userName)}
            className="font-semibold text-text-900 text-body-sm"
          >
            {userName}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-text-700 text-body-sm">{comment}</p>
      </div>
    </div>
  );
}