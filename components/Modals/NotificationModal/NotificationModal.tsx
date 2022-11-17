import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import NewIcon from "assets/icons/new.svg";
import ProfileImage from "components/ProfileImage";
import { notificationList } from "constants/constants";
import { useAppSelector } from "store/hooks";
import { useGetPushListQuery, usePostPushReadMutation } from "store/postsApi";
import { IPushData, IPushList } from "types/types";
import { relativeDate } from "utils/formatDate";
import { useIntersectionObserver } from "utils/useIntersectionObserver";
import { useModalRef } from "utils/useModalRef";

import styles from "./NotificationModal.module.scss";

const NotificationModal = ({
  setModal,
  open,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) => {
  const [list, setList] = useState<IPushData["content"]>([]);
  const [hasNext, setHasNext] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);
  const page = useIntersectionObserver(hasNext, modalRef);

  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { id: userId } = useAppSelector((state) => state.user);

  const currentResult = useGetPushListQuery(page, {
    skip: !isLoggedIn || !hasNext || page < 0,
  });
  const [postPushRead] = usePostPushReadMutation();

  useEffect(() => {
    if (currentResult.data) {
      const { data } = currentResult;
      if (!data.hasNext) setHasNext(false);
      setList((list) => list.concat(data.content));
    }
  }, [currentResult.data]);

  useModalRef(modalRef, setModal);

  const onPushClick = (push: IPushList) => {
    if (!push.isRead) postPushRead({ userId, pushEventIds: [push.id] });
  };

  return (
    <div ref={modalRef} className={`${styles.wrapper} ${open && styles.open}`}>
      {!list?.length ? (
        <div className={`${styles.empty} ${styles["typo6-regular"]}`}>
          아직 알림이 없습니다.
        </div>
      ) : (
        <ul>
          {list?.map((push) => {
            const link = push.linkUrl.split("v1")[1];
            return (
              <Link key={push.id} href={link}>
                <a>
                  <li onClick={() => onPushClick(push)}>
                    <div className={styles.imageWrapper}>
                      {push.isRead ? null : <NewIcon />}
                      <div className={styles.imageInnerWrapper}>
                        <ProfileImage
                          imageUrl={
                            push.writer.profileImage
                              ? process.env.BUCKET_URL +
                                push.writer.profileImage
                              : "/default_profile_image.png"
                          }
                          alt={`${push.writer.nickname}의 이미지`}
                        />
                      </div>
                    </div>
                    <div className={styles.text}>
                      <div
                        className={`${styles.content} ${
                          push.isRead && styles.read
                        }`}
                      >
                        <span className={styles.writerName}>
                          {push.writer.nickname}
                        </span>{" "}
                        님이{" "}
                        {
                          notificationList.find(
                            (notification) => notification.key === push.kind
                          )?.phrase
                        }
                      </div>
                      <div
                        className={`${styles["typo2-regular"]} ${styles.date}`}
                      >
                        {relativeDate(push.createdAt)}
                      </div>
                    </div>
                  </li>
                </a>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NotificationModal;
