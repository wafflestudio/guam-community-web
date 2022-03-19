import PostsArrangeButtons from "./PostsArrangeButtons";
import PostWriteMessage from "./PostWriteMessage";

import styles from "./MessageBox.module.scss";

export default function MessageBox() {
  return (
    <div className={styles.container}>
      <PostWriteMessage />
      <PostsArrangeButtons />
    </div>
  );
}
