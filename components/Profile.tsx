import { useAppSelector } from "store/hooks";
import styles from "styles/Profile.module.scss";

import ProfileImage from "./ProfileImage";
import SignInUpButton from "./Side/SignInUpButton";

export default function Profile() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { nickname, profileImage } = useAppSelector((state) => state.user);

  return (
    <>
      {isLoggedIn ? (
        <div className={styles.container}>
          <div className={styles.profileImage}>
            <ProfileImage
              imageUrl={process.env.BUCKET_URL! + profileImage}
              alt={`${nickname}님의 프로필 이미지`}
            />
          </div>
          <div className={`${styles["typo6-medium"]} ${styles.nickname}`}>
            {nickname}
          </div>
        </div>
      ) : isLoggedIn === false ? (
        <SignInUpButton />
      ) : null}
    </>
  );
}
