import PostFormModal from "../Modals/PostFormModal/PostFormModal";
import Side from "../PostPageSide/Side";

import PaginationButton from "./PaginationButton/PaginationButton";
import Posts from "./Posts/Posts";

import styles from "./PostsPage.module.scss";

export default function PostsPage() {
  return (
    <div className={styles.container}>
      <Side />
      <Posts />
      <PostFormModal />
      <PaginationButton pageNum={3} />
    </div>
  );
}
