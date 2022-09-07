import React from "react";

import Side from "components/Side/Side";

import ProfileContent from "./ProfileContent";

import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <Side />
      <ProfileContent />
    </div>
  );
};

export default ProfilePage;
