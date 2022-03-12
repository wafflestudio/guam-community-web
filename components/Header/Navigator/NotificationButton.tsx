import styles from "./NotificationButton.module.scss";
import NotificationIcon from "../../../assets/icons/notification/outlined/new.svg";

export default function NotificationButton() {
  return (
    <li className={styles.notificationButton}>
      <button>
        <NotificationIcon />
        <div className={styles["typo1-medium"]}>알림</div>
      </button>
    </li>
  );
}
