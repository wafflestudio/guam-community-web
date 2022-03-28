import styles from "./ProfileButton.module.scss";
import ProfileIcon from "../../../assets/icons/profile/outlined.svg";

export default function ProfileButton() {
  return (
    <li className={styles.profileButton}>
      <button>
        <ProfileIcon />
        <div className={styles["typo1-medium"]}>프로필</div>
      </button>
    </li>
  );
}
