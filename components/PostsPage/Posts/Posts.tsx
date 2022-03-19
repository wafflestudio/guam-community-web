import PostsList from "./PostsList/PostsList";
import WriteAPost from "./WriteAPost/WriteAPost";

import styles from "./Posts.module.scss";

export default function Posts() {
  return (
    <div className={styles.container}>
      <WriteAPost />
      <PostsList />
    </div>
  );
}
