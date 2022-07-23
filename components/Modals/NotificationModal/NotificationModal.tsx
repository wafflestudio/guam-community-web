import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import throttle from "lodash/throttle";
import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { useGetPushListQuery } from "../../../api/postsApi";
import { useAppSelector } from "../../../store/hooks";
import { IPushData } from "../../../types/types";

import styles from "./NotificationModal.module.scss";

dayjs.extend(relativeTime);

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

  const currentResult = useGetPushListQuery(page, {
    skip: !isLoggedIn || !hasNext || page < 0,
  });

  useEffect(() => {
    if (currentResult.data) {
      const { data } = currentResult;
      if (!data.hasNext) setHasNext(false);
      setList((list) => list.concat(data.content));
    }
  }, [currentResult.data]);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!modalRef.current?.contains(e.target as Node)) setModal(false);
    };

    document.addEventListener("mousedown", listener);

    return () => document.removeEventListener("mousedown", listener);
  }, []);

  const handleScroll = () => {
    if (modalRef.current && hasNext) {
      console.log(
        modalRef.current?.clientHeight,
        modalRef.current?.scrollHeight - modalRef.current?.scrollTop - 1
      );
      const reachBottom =
        modalRef.current?.clientHeight >=
        modalRef.current?.scrollHeight - modalRef.current?.scrollTop - 1;
      if (reachBottom) {
        if (hasNext) setPage((page) => page + 1);
      }
    }
  };
  const throttleScroll = throttle(handleScroll, 300);

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
                    className={`${styles.content} ${
                      push.isRead && styles.read
                    }`}
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
      )}
    </div>
  );
};

export default NotificationModal;
