import styles from "../PostsPage/PostsPage.module.scss";
import Side from "../Side/Side";

import PostDetail from "./PostDetail/PostDetail";

export default function PostDetailPage() {
  return (
    <div className={styles.container}>
      <Side />
      <PostDetail />
    </div>
  );
}
