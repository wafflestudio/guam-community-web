import PostWriteButton from "../../../PostWriteButton/PostWriteButton";

import MessageBox from "./MessageBox/MessageBox";

import styles from "./WriteAPost.module.scss";

export default function WriteAPost() {
  return (
    <div className={styles.container}>
      <MessageBox />
      <PostWriteButton postDetailPage={false} />
    </div>
  );
}
