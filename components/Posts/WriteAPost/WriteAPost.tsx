import MessageBox from "./MessageBox/MessageBox";
import PostWriteButton from "./PostWriteButton/PostWriteButton";
import styles from "./WriteAPost.module.scss";

export default function WriteAPost() {
  return (
    <div className={styles.container}>
      <MessageBox />
      <PostWriteButton />
    </div>
  );
}
