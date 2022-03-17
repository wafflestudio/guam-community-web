import { boardList } from "../../../constants/constants";
import { useAppSelector } from "../../../store/hooks";
import styles from "./BoardName.module.scss";

export default function BoardName() {
  const post = useAppSelector((state) => state.postDetail.post?.data);

  const boardName = boardList.find((board) => post?.boardId === board.id)?.name;

  return (
    <div className={styles.container}>
      <div className={`${styles["typo6-regular"]} ${styles.boardName}`}>
        {boardName}
      </div>
      <div className={`${styles["typo2-medium"]} ${styles.tag}`}>#</div>
    </div>
  );
}
