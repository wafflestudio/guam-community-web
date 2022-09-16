import { useRouter } from "next/router";

import { postsApi } from "store/postsApi";
import styles from "styles/CommentsList.module.scss";

import Comment from "./Comment";

export default function CommentsList() {
  const router = useRouter();
  const { postId } = router.query;

  const comments = postsApi.endpoints.getPostDetail.useQueryState(
    typeof postId === "string" ? parseInt(postId) : 0
  ).data?.comments;

  return (
    <div className={styles.container}>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
