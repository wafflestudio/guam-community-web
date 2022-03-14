import styles from "./PostsArrangeButtons.module.scss";

export default function PostsArrangeButtons() {
  return (
    <div className={styles.container}>
      <button className={styles["typo2-medium"]} id={styles.recommend}>
        추천순
      </button>
      <button className={styles["typo2-medium"]} id={styles.time}>
        시간순
      </button>
    </div>
  );
}
