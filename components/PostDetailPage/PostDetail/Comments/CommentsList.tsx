import { useRouter } from "next/router";

import { postDetailApi } from "../../../../api/postDetailApi";

import Comment from "./Comment";

import styles from "./CommentsList.module.scss";

export default function CommentsList() {
  const router = useRouter();
  const { postId } = router.query;

  const comments = postDetailApi.endpoints.getPostDetail.useQueryState(
    typeof postId === "string" ? postId : "0"
  ).data?.comments;

  return (
    <div className={styles.container}>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
