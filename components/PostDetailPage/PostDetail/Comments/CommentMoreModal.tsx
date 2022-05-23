import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

import { useAppDispatch } from "../../../../store/hooks";
import {
  setUserBlockModal,
  setUserReportModal,
} from "../../../../store/modalSlice";
import { IUser } from "../../../../types/types";

import styles from "./Comment.module.scss";

export default function CommentMoreModal({
  user,
  setSelectedId,
}: {
  user: IUser;
  setSelectedId: Dispatch<SetStateAction<number | null>>;
}) {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const onSendMessage = () => router.push("/letters");

  const onReportUser = () => {
    dispatch(setUserReportModal({ open: true, user }));
    setSelectedId(null);
  };

  const onBlockUser = () => {
    dispatch(setUserBlockModal({ open: true, user }));
    setSelectedId(null);
  };

  return (
    <div className={styles.moreModal}>
      <ul>
        <li>
          <button onClick={onSendMessage}>쪽지 보내기</button>
        </li>
        <li>
          <button onClick={onReportUser}>신고하기</button>
        </li>
        <li>
          <button onClick={onBlockUser}>차단하기</button>
        </li>
      </ul>
    </div>
  );
}
