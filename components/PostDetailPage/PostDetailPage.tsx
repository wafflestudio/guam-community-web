import ImageExtendModal from "../Modals/ImageExtendModal/ImageExtendModal";
import PostFormModal from "../Modals/PostFormModal/PostFormModal";
import UserBlockModal from "../Modals/UserBlockModal/UserBlockModal";
import UserReportModal from "../Modals/UserReportModal/UserReportModal";
import Side from "../PostPageSide/Side";
import styles from "../PostsPage/PostsPage.module.scss";

import PostDetail from "./PostDetail/PostDetail";

export default function PostDetailPage() {
  return (
    <div className={styles.container}>
      <Side />
      <PostDetail />
      <PostFormModal />
      <UserReportModal />
      <UserBlockModal />
      <ImageExtendModal />
    </div>
  );
}
