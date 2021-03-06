import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { postsApi } from "../../../api/postsApi";
import MoreIcon from "../../../assets/icons/more.svg";
import DeleteConfirmModal from "../PostModifyModal/DeleteConfirmModal/DeleteConfirmModal";
import PostModifyModal from "../PostModifyModal/PostModifyModal";

import styles from "./PostMain.module.scss";

dayjs.extend(relativeTime);

export default function PostMain() {
  const [postModifyModal, setPostModifyModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [imageNum, setImageNum] = useState(0);

  const router = useRouter();
  const { postId } = router.query;

  const post = postsApi.endpoints.getPostDetail.useQueryState(
    typeof postId === "string" ? parseInt(postId) : 0
  ).data;

  const toggleMore = useCallback(() => {
    const modalState = postModifyModal;
    setPostModifyModal(!modalState);
  }, [postModifyModal]);

  return (
    <div className={styles.container}>
      <h1 className={`${styles["typo8-medium"]} ${styles.title}`}>
        {post?.title}
      </h1>
      <hr />
      <div className={styles.userInfo}>
        <div className={styles.profileImage}>
          <img
            src={
              post?.user.profileImage
                ? process.env.BUCKET_URL +
                  post?.user.profileImage +
                  "?" +
                  Date.now()
                : "/default_profile_image.png"
            }
          />
        </div>
        <div className={`${styles["typo5-regular"]} ${styles.userNickname}`}>
          {post?.user.nickname}
        </div>
      </div>
      <div className={styles.content}>
        <div className={`${styles["typo4-regular"]} ${styles.description}`}>
          {post?.content}
        </div>
      </div>
      {post?.imagePaths.length !== 0 ? (
        <div className={styles.imageList}>
          <img
            className={styles.big}
            src={process.env.BUCKET_URL + (post?.imagePaths[imageNum] || "")}
          />
          <ul>
            {post?.imagePaths.map((path, index) => {
              return (
                <li key={path} onClick={() => setImageNum(index)}>
                  <img src={process.env.BUCKET_URL + path} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <div className={`${styles["typo1-regular"]} ${styles.createdAt}`}>
        {post && dayjs(new Date(post.createdAt)).locale(ko).fromNow()}
      </div>
      {post?.isMine ? (
        <div className={styles.more}>
          <button onClick={toggleMore}>
            <MoreIcon />
          </button>
          {postModifyModal ? (
            <PostModifyModal setDeleteConfirmModal={setDeleteConfirmModal} />
          ) : null}
          {deleteConfirmModal ? (
            <DeleteConfirmModal
              type={"?????????"}
              id={post.id}
              deleteConfirmModal={deleteConfirmModal}
              setDeleteConfirmModal={setDeleteConfirmModal}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
