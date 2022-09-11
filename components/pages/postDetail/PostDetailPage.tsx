import Side from "components/Side/Side";
import styles from "styles/PostDetailPage.module.scss";

import PostDetail from "./Post/PostDetail";

export default function PostDetailPage() {
  return (
    <div className={styles.container}>
      <Side />
      <PostDetail />
    </div>
  );
}
