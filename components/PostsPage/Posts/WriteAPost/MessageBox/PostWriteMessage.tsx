import styles from "./PostWriteMessage.module.scss";

export default function PostWriteMessage() {
  return (
    <div className={styles.container}>
      <span className={styles["typo5-medium"]} id={styles.specials}>
        특별한 일이 있나요? ✨
      </span>
    </div>
  );
}
