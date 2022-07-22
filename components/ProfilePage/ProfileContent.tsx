import React from "react";

import { postsApi } from "../../api/postsApi";
import BlogIcon from "../../assets/icons/blog/gray.svg";
import GithubIcon from "../../assets/icons/github/gray.svg";
import useRouterInfo from "../../utils/useRouterInfo";

import styles from "./ProfilePage.module.scss";

const ProfileContent = () => {
  const { userId } = useRouterInfo();

  const user =
    typeof userId === "string"
      ? postsApi.endpoints.getUser.useQueryState(parseInt(userId))?.data
      : undefined;

  console.log(user?.interests);

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
      <div className={styles.introduction}>{user?.introduction}</div>
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