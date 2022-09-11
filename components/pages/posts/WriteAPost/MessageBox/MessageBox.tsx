import styles from "styles/PostsPage.module.scss";

import PostsArrangeButtons from "./PostsArrangeButtons";
import PostWriteMessage from "./PostWriteMessage";

export default function MessageBox() {
  return (
    <div className={styles.messageContainer}>
      <PostWriteMessage />
      <PostsArrangeButtons />
    </div>
  );
}
