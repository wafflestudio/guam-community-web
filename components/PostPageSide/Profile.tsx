import { useAppSelector } from "../../store/hooks";

import SignInUpButton from "./SignInUpButton";

import styles from "./Profile.module.scss";

export default function Profile() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { nickname, profileImage } = useAppSelector((state) => state.user);

  return (
    <>
      {isLoggedIn ? (
        <div className={styles.container}>
          <div className={styles.profileImage}>
            {profileImage ? (
              <img
                src={process.env.BUCKET_URL + profileImage + "?" + Date.now()}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/default_profile_image.png";
                }}
              />
            ) : (
              <img src={"/default_profile_image.png"} />
            )}
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
