import React from "react";

import ProfileImage from "components/ProfileImage";
import { useAppSelector } from "store/hooks";
import { useDeleteBlockMutation, useGetBlocksQuery } from "store/postsApi";
import styles from "styles/BanList.module.scss";

const BanList = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { data } = useGetBlocksQuery(undefined, {
    skip: !isLoggedIn,
  });
  const [deleteBlock] = useDeleteBlockMutation();

  const onDeleteBlock = (userId: number | null) => {
    if (typeof userId === "number") deleteBlock(userId);
  };

  return (
    <div className={styles.container}>
      <h1 className="typo5-medium">차단 목록</h1>
      <ul>
        {data?.blockUsers.map((user) => (
          <li key={user.id} className={styles.userContainer}>
            <div className={styles.imageWrapper + " image-wrapper"}>
              <ProfileImage
                imageUrl={process.env.BUCKET_URL! + user.profileImage}
                alt={`${user.nickname}님의 프로필 이미지`}
              />
            </div>
            <div className={styles.userBlockButton}>
              <div className="typo4-regular">{user.nickname}</div>
              <button
                className="typo2-regular"
                onClick={() => onDeleteBlock(user.id)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BanList;
