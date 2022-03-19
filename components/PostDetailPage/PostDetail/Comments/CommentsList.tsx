import { useAppSelector } from "../../../../store/hooks";

import Comment from "./Comment";

import styles from "./CommentsList.module.scss";

export default function CommentsList() {
  const comments = useAppSelector((state) => state.comments.comments);

  return (
    <div className={styles.container}>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
