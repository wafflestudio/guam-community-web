import Link from "next/link";
import React from "react";

import BlogIcon from "assets/icons/blog/gray.svg";
import GithubIcon from "assets/icons/github/gray.svg";
import SettingIcon from "assets/icons/setting.svg";
import { useAppSelector } from "store/hooks";
import { useGetUserQuery } from "store/postsApi";
import styles from "styles/ProfilePage.module.scss";
import useRouterInfo from "utils/useRouterInfo";

const ProfilePage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { userId } = useRouterInfo();

  const { data: user } = useGetUserQuery(userId!, {
    skip: !userId || !isLoggedIn,
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imageContainer + " image-wrapper"}>
          <img
            src={
              user?.profileImage
                ? process.env.BUCKET_URL + user?.profileImage
                : ""
            }
            alt={`${user?.nickname}의 프로필 이미지`}
          />
        </div>
        <div className={styles.summary}>
          <div className={styles.nickname}>
            <h1 className={"typo8-medium"}>{user?.nickname}</h1>
            <Link href={"/profile/set"}>
              <a className="typo2-regular">프로필 수정</a>
            </Link>
          </div>
          <div className={styles.links}>
            {user?.githubId ? (
              <a
                target={"_blank"}
                href={"https://github.com/" + user?.githubId}
                rel="noreferrer"
              >
                <GithubIcon />
              </a>
            ) : null}
            {user?.blogUrl ? (
              <a target={"_blank"} href={user?.blogUrl} rel="noreferrer">
                <BlogIcon />
              </a>
            ) : null}
          </div>
          <Link href={"/profile/set"}>
            <a className={styles.settingLink + " typo2-regular"}>
              <button className={styles.setting + " typo3-medium"}>
                <SettingIcon />
                설정
              </button>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.introduction}>
        <h2 className="typo4-medium">소개</h2>
        <p className="typo4-regular">{user?.introduction}</p>
      </div>
      <div className={styles.interests}>
        <h2 className="typo4-medium">관심사</h2>
        <div>
          {user?.interests.map((interest) => (
            <button className="typo2-regular" key={interest.name}>
              {interest.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
