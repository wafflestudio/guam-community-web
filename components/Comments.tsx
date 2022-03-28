import { IComment } from "../types/types";

export default function Comments({
  comments,
}: {
  comments: IComment[] | null;
}) {
  const commentsList = comments?.map((comment) => (
    <li key={comment.id}>
      {comment.user.nickname} {comment.content}
    </li>
  ));

  return <>{commentsList}</>;
}
