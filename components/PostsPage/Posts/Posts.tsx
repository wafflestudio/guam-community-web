import styles from "./Posts.module.scss";
import PostsList from "./PostsList/PostsList";
import WriteAPost from "./WriteAPost/WriteAPost";

export default function Posts() {
  return (
    <div className={styles.container}>
      <WriteAPost />
      <PostsList />
    </div>
  );
}
