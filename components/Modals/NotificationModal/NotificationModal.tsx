import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

import { useGetPushListQuery } from "../../../api/postsApi";
import { useAppSelector } from "../../../store/hooks";

import styles from "./NotificationModal.module.scss";

dayjs.extend(relativeTime);

const NotificationModal = ({
  setModal,
  open,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const pushList = useGetPushListQuery(0, {
    skip: isLoggedIn === undefined,
  }).data;

  return (
    <div className={`${styles.wrapper} ${open && styles.open}`}>
      <ul>
        {pushList?.content.map((push) => {
          const link = push.linkUrl.substr(push.linkUrl.indexOf("1") + 1);

          return (
            <li key={push.id}>
              <div className={styles.imageWrapper}>
                <img
                  alt={`${push.writer.nickname}의 이미지`}
                  src={
                    push.writer.profileImage
                      ? process.env.BUCKET_URL + push.writer.profileImage
                      : "/default_profile_image.png"
                  }
                />
              </div>
              <div className={styles.text}>
                <div
                  className={`${styles.content} ${push.isRead && styles.read}`}
                >
                  <Link href={link}>
                    <a>
                      {push.writer.nickname}가 {push.kind}
                    </a>
                  </Link>
                </div>
                <div className={`${styles["typo2-regular"]} ${styles.date}`}>
                  {dayjs(push.createdAt).locale(ko).fromNow()}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificationModal;
