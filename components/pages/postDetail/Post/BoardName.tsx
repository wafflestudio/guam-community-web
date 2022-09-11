import { boardList, categoryList } from "constants/constants";
import { useGetPostDetailQuery } from "store/postsApi";
import styles from "styles/PostDetailPage.module.scss";
import useRouterInfo from "utils/useRouterInfo";

export default function BoardName() {
  const { postId } = useRouterInfo();

  const { data: post } = useGetPostDetailQuery(postId!, { skip: !postId });

  const boardName = boardList.find((board) => post?.boardId === board.id)?.name;
  const tagName = categoryList.find(
    (category) => post?.category?.categoryId === category.id
  )?.name;

  return (
    <div className={styles.boardContainer}>
      <div className={`${styles["typo6-regular"]} ${styles.boardName}`}>
        {boardName}
      </div>
      <div className={`${styles["typo2-medium"]} ${styles.tag}`}>
        #{tagName}
      </div>
    </div>
  );
}
