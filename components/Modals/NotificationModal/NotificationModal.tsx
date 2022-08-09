import throttle from "lodash/throttle";
import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { notificationList } from "../../../constants/constants";
import { useAppSelector } from "../../../store/hooks";
import {
  useGetPushListQuery,
  usePostPushReadMutation,
} from "../../../store/postsApi";
import { IPushData } from "../../../types/types";
import { relativeDate } from "../../../utils/formatDate";
import { useModalRef } from "../../../utils/useModalRef";

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
  const [page, setPage] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleScroll = () => {
    if (modalRef.current && hasNext) {
      const reachBottom =
        modalRef.current?.clientHeight >=
        modalRef.current?.scrollHeight - modalRef.current?.scrollTop - 1;
      if (reachBottom) {
        if (hasNext) setPage((page) => page + 1);
      }
    }
  };
  const throttleScroll = throttle(handleScroll, 300);

  const onPushClick = (pushEventIds: number[]) => {
    postPushRead({ userId, pushEventIds });
  };

  return (
    <div
      ref={modalRef}
      className={`${styles.wrapper} ${open && styles.open}`}
      onScroll={throttleScroll}
    >
      {!list?.length ? (
        <div className={`${styles.empty} ${styles["typo6-regular"]}`}>
          아직 알림이 없습니다.
        </div>
      ) : (
        <ul>
          {list?.map((push) => {
            const link = push.linkUrl.substr(push.linkUrl.indexOf("1") + 1);

            return (
              <li key={push.id} onClick={() => onPushClick([push.id])}>
                <div className={styles.imageWrapper}>
                  {push.isRead ? null : (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="6" cy="6" r="6" fill="#FF00FF" />
                    </svg>
                  )}
                  <div className={styles.imageInnerWrapper}>
                    <img
                      alt={`${push.writer.nickname}의 이미지`}
                      src={
                        push.writer.profileImage
                          ? process.env.BUCKET_URL + push.writer.profileImage
                          : "/default_profile_image.png"
                      }
                    />
                  </div>
                </div>
                <div className={styles.text}>
                  <div
                    className={`${styles.content} ${
                      push.isRead && styles.read
                    }`}
                  >
                    <Link href={link}>
                      <a>
                        <span className={styles.writerName}>
                          {push.writer.nickname}
                        </span>{" "}
                        님이{" "}
                        {
                          notificationList.find(
                            (notification) => notification.key === push.kind
                          )?.phrase
                        }
                      </a>
                    </Link>
                  </div>
                  <div className={`${styles["typo2-regular"]} ${styles.date}`}>
                    {relativeDate(push.createdAt)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NotificationModal;
