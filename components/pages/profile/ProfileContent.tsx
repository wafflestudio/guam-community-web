import React from "react";

import BlogIcon from "assets/icons/blog/gray.svg";
import GithubIcon from "assets/icons/github/gray.svg";
import { useAppSelector } from "store/hooks";
import { useGetUserQuery } from "store/postsApi";
import styles from "styles/ProfilePage.module.scss";
import useRouterInfo from "utils/useRouterInfo";

const ProfileContent = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { userId } = useRouterInfo();

  const { data: user } = useGetUserQuery(userId!, {
    skip: !userId || !isLoggedIn,
  });

  return (
    <div className={styles.contentContainer}>
      {user?.profileImage ? (
        <div className={styles.imageWrapper}>
          <img
            src={process.env.BUCKET_URL + user?.profileImage}
            alt={`${user.nickname}의 프로필 이미지`}
          />
        </div>
      ) : null}
      <div className={`${styles.nickname} ${styles["typo6-medium"]}`}>
        {user?.nickname}
      </div>
      <div className={`${styles.introduction} ${styles["typo4-regular"]}`}>
        {user?.introduction}
      </div>
      {user?.githubId ? (
        <button className={styles.github}>
          <a
            target="_blank"
            href={`https://github.com/${user.githubId}`}
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
        </button>
      ) : null}
      {user?.blogUrl ? (
        <button className={styles.blogUrl}>
          <a target="_blank" href={user.blogUrl} rel="noopener noreferrer">
            <BlogIcon />
          </a>
        </button>
      ) : null}
      <ul className={styles.interestList}>
        {user?.interests.map((interest, index) => (
          <li className={styles["typo2-regular"]} key={index}>
            {interest.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileContent;
