import { useRouter } from "next/router";
import { useState } from "react";

import { postsApi } from "../../../../api/postsApi";

import Comment from "./Comment";

import styles from "./CommentsList.module.scss";

export default function CommentsList() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const router = useRouter();
  const { postId } = router.query;

  const comments = postsApi.endpoints.getPostDetail.useQueryState(
    typeof postId === "string" ? postId : "0"
  ).data?.comments;

  return (
    <div className={styles.container}>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ))}
    </div>
  );
}
