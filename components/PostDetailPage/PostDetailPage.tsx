import Side from "../PostsPage/Side/Side";
import styles from "../PostsPage/PostsPage.module.scss";
import PostDetail from "./PostDetail/PostDetail";

export default function PostDetailPage() {
  return (
    <div className={styles.container}>
      <Side />
      <PostDetail />
    </div>
  );
}
