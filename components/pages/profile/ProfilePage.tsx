import React from "react";

import Side from "components/Side/Side";
import styles from "styles/ProfilePage.module.scss";

import ProfileContent from "./ProfileContent";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <Side />
      <ProfileContent />
    </div>
  );
};

export default ProfilePage;
