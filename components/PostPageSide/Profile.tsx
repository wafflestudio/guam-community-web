import styles from "./Profile.module.scss";

export default function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.profileImage}>
        <img src="/image_iu 1.png" />
      </div>
      <div className={`${styles["typo6-medium"]} ${styles.nickname}`}>
        bluesky
      </div>
    </div>
  );
}
