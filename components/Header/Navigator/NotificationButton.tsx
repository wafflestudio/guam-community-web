import { useState } from "react";

import NotificationIcon from "../../../assets/icons/notification/outlined/default.svg";
import NotificationModal from "../../Modals/NotificationModal/NotificationModal";

import styles from "./NotificationButton.module.scss";

export default function NotificationButton() {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles.notificationButton}>
      <button onClick={() => setOpen((open) => !open)}>
        <NotificationIcon />
        <div className={styles["typo1-medium"]}>알림</div>
      </button>
      <NotificationModal setModal={setOpen} open={open} />
    </li>
  );
}
