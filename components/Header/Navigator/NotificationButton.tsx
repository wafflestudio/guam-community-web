import { useState } from "react";

import { useGetPushListQuery } from "../../../api/postsApi";
import NotificationNewFilledIcon from "../../../assets/icons/notification/filled/new.svg";
import NotificationIcon from "../../../assets/icons/notification/outlined/default.svg";
import NotificationNewIcon from "../../../assets/icons/notification/outlined/new.svg";
import { useAppSelector } from "../../../store/hooks";
import NotificationModal from "../../Modals/NotificationModal/NotificationModal";

import styles from "./NotificationButton.module.scss";

export default function NotificationButton() {
  const [open, setOpen] = useState(false);

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const pushList = useGetPushListQuery(0, {
    skip: isLoggedIn === undefined,
  }).data;

  return (
    <li className={styles.notificationButton}>
      <button onClick={() => setOpen((open) => !open)}>
        {pushList?.content.length ? (
          open ? (
            <NotificationNewFilledIcon />
          ) : (
            <NotificationNewIcon />
          )
        ) : (
          <NotificationIcon />
        )}
        <div className={styles["typo1-medium"]}>알림</div>
      </button>
      <NotificationModal setModal={setOpen} open={open} />
    </li>
  );
}
