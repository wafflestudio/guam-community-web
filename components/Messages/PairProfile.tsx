import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import MoreIcon from "../../assets/icons/more.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserBlockModal, setUserReportModal } from "../../store/modalSlice";
import { useGetUserQuery } from "../../store/postsApi";
import useRouterInfo from "../../utils/useRouterInfo";

import styles from "./Messages.module.scss";

export default function PairProfile() {
  const [modal, setModal] = useState(false);

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { pairId } = useRouterInfo();

  const { data: pair } = useGetUserQuery(pairId!, {
    skip: !isLoggedIn || !pairId,
  });

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onClickMore = () => setModal((modal) => !modal);

  const onSendMessage = () => router.push("/letters");

  const onReportUser = () => {
    dispatch(setUserReportModal({ user: pair }));
    setModal(false);
  };

  const onBlockUser = () => {
    dispatch(setUserBlockModal({ user: pair }));
    setModal(false);
  };

  return (
    <div className={styles.pairProfile}>
      <div className={styles.imageWrapper}>
        <img
          src={
            pair?.profileImage
              ? process.env.BUCKET_URL + pair.profileImage
              : "/default_profile_image.png"
          }
          alt={`${pair?.nickname}의 프로필 이미지`}
        />
      </div>
      <div className={`${styles["typo6-medium"]} ${styles.nickname}`}>
        {pair?.nickname}
      </div>
      <Link href={`/profile/${pair?.id}`}>
        <a>
          <div className={styles.profileLink}>프로필 보기</div>
        </a>
      </Link>
      <button className={styles.moreButton} onClick={onClickMore}>
        <MoreIcon />
      </button>
      {modal ? (
        <div className={styles.moreModal}>
          <ul>
            <li>
              <button onClick={onSendMessage}>쪽지 삭제하기</button>
            </li>
            <li>
              <button onClick={onReportUser}>신고하기</button>
            </li>
            <li>
              <button onClick={onBlockUser}>차단하기</button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
