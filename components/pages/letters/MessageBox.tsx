import { useRef } from "react";

import EmptyIcon from "assets/icons/empty.svg";
import { useAppSelector } from "store/hooks";
import { postsApi } from "store/postsApi";
import styles from "styles/Messages.module.scss";
import useRouterInfo from "utils/useRouterInfo";

import MessageForm from "./MessageForm";
import MessagesList from "./MessagesList";
import PairProfile from "./PairProfile";

export default function MessagesBox() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { pairId } = useRouterInfo();
  const { isLoading: listLoading } =
    postsApi.endpoints.getLetters.useQueryState(undefined, {
      skip: !isLoggedIn,
    });

  const messageListRef = useRef<HTMLUListElement>(null);

  return (
    <div className={styles.mainContainer}>
      {listLoading ? (
        <img src="/loading.gif" alt="로딩 중" className={styles.emptyImg} />
      ) : !pairId ? (
        <div className={styles.emptyImg}>
          <EmptyIcon />
        </div>
      ) : (
        <>
          <PairProfile />
          <MessagesList messageListRef={messageListRef} />
          <MessageForm messageListRef={messageListRef} />
        </>
      )}
    </div>
  );
}
