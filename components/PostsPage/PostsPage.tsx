import PostFormModal from "../Modals/PostFormModal/PostFormModal";
import Side from "../PostPageSide/Side";

import PostsList from "./Posts/PostsList/PostsList";
import WriteAPost from "./Posts/WriteAPost/WriteAPost";

import styles from "./PostsPage.module.scss";

export default function PostsPage() {
  return (
    <div className={styles.container}>
      <Side />
      <WriteAPost />
      <PostsList />
      <PostFormModal />
    </div>
  );
}
