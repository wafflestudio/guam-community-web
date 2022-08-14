import { useRef } from "react";

import EmptyIcon from "../../assets/icons/empty.svg";
import { useAppSelector } from "../../store/hooks";
import useRouterInfo from "../../utils/useRouterInfo";

import MessageForm from "./MessageForm";
import MessagesList from "./MessagesList";
import PairProfile from "./PairProfile";

import styles from "./Messages.module.scss";

export default function MessagesBox() {
  const { pairId } = useRouterInfo();

  const messageListRef = useRef<HTMLUListElement>(null);

  return (
    <div className={styles.mainContainer}>
      {!pairId ? (
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
