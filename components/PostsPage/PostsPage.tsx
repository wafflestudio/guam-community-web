import PostFormModal from "../Modals/PostFormModal/PostFormModal";
import Side from "../PostPageSide/Side";

import Posts from "./Posts/Posts";

import styles from "./PostsPage.module.scss";

export default function PostsPage() {
  return (
    <div className={styles.container}>
      <Side />
      <Posts />
      <PostFormModal />
    </div>
  );
}
