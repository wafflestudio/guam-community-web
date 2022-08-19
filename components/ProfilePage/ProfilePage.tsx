import React from "react";

import PostsBoard from "../PostPageSide/PostsBoard";

import ProfileContent from "./ProfileContent";

import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <PostsBoard />
      <ProfileContent />
    </div>
  );
};

export default ProfilePage;
