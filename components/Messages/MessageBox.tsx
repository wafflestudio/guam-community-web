import { useRef } from "react";

import EmptyIcon from "../../assets/icons/empty.svg";
import { useAppSelector } from "../../store/hooks";

import MessageForm from "./MessageForm";
import MessagesList from "./MessagesList";
import PairProfile from "./PairProfile";

import styles from "./Messages.module.scss";

export default function MessagesBox() {
  const { pair } = useAppSelector((state) => state);

  const messageListRef = useRef<HTMLUListElement>(null);

  return (
    <div className={styles.mainContainer}>
      {pair.id === (undefined || null) ? (
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
