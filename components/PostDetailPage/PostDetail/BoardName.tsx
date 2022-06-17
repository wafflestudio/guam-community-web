import { useRouter } from "next/router";

import { postsApi } from "../../../api/postsApi";
import { boardList, categoryList } from "../../../constants/constants";

import styles from "./BoardName.module.scss";

export default function BoardName() {
  const router = useRouter();
  const { postId } = router.query;

  const post = postsApi.endpoints.getPostDetail.useQueryState(
    typeof postId === "string" ? postId : "0"
  ).data;

  const boardName = boardList.find((board) => post?.boardId === board.id)?.name;
  const tagName = categoryList.find(
    (category) => post?.category.categoryId === category.id
  )?.name;

  return (
    <div className={styles.container}>
      <div className={`${styles["typo6-regular"]} ${styles.boardName}`}>
        {boardName}
      </div>
      <div className={`${styles["typo2-medium"]} ${styles.tag}`}>
        #{tagName}
      </div>
    </div>
  );
}
