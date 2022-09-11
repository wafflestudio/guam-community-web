import PostWriteButton from "components/Buttons/PostWriteButton";
import styles from "styles/PostsPage.module.scss";

import MessageBox from "./MessageBox/MessageBox";

export default function WriteAPost() {
  return (
    <div className={styles.writeAPostcontainer}>
      <MessageBox />
      <PostWriteButton postDetailPage={false} />
    </div>
  );
}
