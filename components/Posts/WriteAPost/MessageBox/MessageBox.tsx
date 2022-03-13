import styles from "./MessageBox.module.scss";
import PostsArrangeButtons from "./PostsArrangeButtons";
import PostWriteMessage from "./PostWriteMessage";

export default function MessageBox() {
  return (
    <div className={styles.container}>
      <PostWriteMessage />
      <PostsArrangeButtons />
    </div>
  );
}
