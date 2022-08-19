import { useRouter } from "next/router";
import { useState } from "react";

import MoreIcon from "../../../assets/icons/more.svg";
import { useAppSelector } from "../../../store/hooks";
import { useGetPostDetailQuery } from "../../../store/postsApi";
import { relativeDate } from "../../../utils/formatDate";
import useRouterInfo from "../../../utils/useRouterInfo";
import MoreModal from "../../Modals/MoreModal/MoreModal";
import PostModifyModal from "../../Modals/PostModifyModal/PostModifyModal";

import styles from "./PostMain.module.scss";

export default function PostMain() {
  const [moreModal, setMoreModal] = useState(false);
  const [imageNum, setImageNum] = useState(0);

  const router = useRouter();
  const onProfileClick = () => {
    if (post?.user.id !== 0 && post?.user.id !== undefined)
      router.push(`/profile/${post?.user.id}`);
  };
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { postId } = useRouterInfo();

  const { data: post, isLoading } = useGetPostDetailQuery(postId!, {
    skip: !postId || !isLoggedIn,
  });

  const toggleMore = () => setMoreModal((modalState) => !modalState);

  return (
    <div className={styles.container}>
      <h1 className={`${styles["typo8-medium"]} ${styles.title}`}>
        {post?.title}
      </h1>
      <hr />
      <div className={`${styles.userInfo}`}>
        <div
          className={`${styles.profileImage} ${
            post?.user.id !== 0 && post?.user.id !== undefined && styles.pointer
          }`}
          onClick={onProfileClick}
        >
          <img
            src={
              post?.user.profileImage
                ? process.env.BUCKET_URL + post?.user.profileImage
                : "/default_profile_image.png"
            }
            alt={`${post?.user.nickname}의 프로필 이미지`}
          />
        </div>
        <div
          className={`${styles["typo5-regular"]} ${styles.userNickname} ${
            post?.user.id !== 0 && post?.user.id !== undefined && styles.pointer
          }`}
          onClick={onProfileClick}
        >
          {post?.user.nickname}
        </div>
      </div>
      <div
        className={`${styles.content} ${isLoading && styles.loadingContent}`}
      >
        {isLoading ? (
          <img className={styles.loading} src={"/loading.gif"} alt={"로딩중"} />
        ) : null}
        <div className={`${styles["typo4-regular"]} ${styles.description}`}>
          {post?.content}
        </div>
      </div>
      {post?.imagePaths.length !== 0 && post?.imagePaths[imageNum] ? (
        <div className={styles.imageList}>
          <img
            className={styles.big}
            src={process.env.BUCKET_URL + post?.imagePaths[imageNum]}
          />
          <ul>
            {post?.imagePaths.map((path, index) => {
              if (path)
                return (
                  <li key={path} onClick={() => setImageNum(index)}>
                    <img
                      src={process.env.BUCKET_URL + path}
                      alt={`${post.title}의 이미지`}
                    />
                  </li>
                );
            })}
          </ul>
        </div>
      ) : null}
      <div className={`${styles["typo1-regular"]} ${styles.createdAt}`}>
        {post && relativeDate(post.createdAt)}
      </div>

      <div className={styles.more}>
        <button onClick={toggleMore}>
          <MoreIcon />
        </button>
        {moreModal && post ? (
          post?.isMine ? (
            <PostModifyModal post={post} setModal={setMoreModal} />
          ) : (
            <MoreModal user={post?.user} setMoreOpen={setMoreModal} />
          )
        ) : null}
      </div>
    </div>
  );
}
