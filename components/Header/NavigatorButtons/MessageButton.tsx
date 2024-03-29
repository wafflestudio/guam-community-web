import Link from "next/link";
import { useRouter } from "next/router";

import MessageIcon from "assets/icons/message/default.svg";
import NewMessagesIcon from "assets/icons/message/new.svg";
import { useAppSelector } from "store/hooks";
import { useGetLettersCountQuery } from "store/postsApi";
import styles from "styles/Navigator.module.scss";

export default function MessageButton() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const { data } = useGetLettersCountQuery({}, { skip: !isLoggedIn });

  return (
    <li className={styles.messageButton}>
      <Link href={"/letters"}>
        <a>
          <button
            className={`${
              router.pathname.includes("/letters") && styles.isAtMessages
            }`}
          >
            {data?.unRead ? <NewMessagesIcon /> : <MessageIcon />}
            <div className={styles["typo1-medium"]}>쪽지함</div>
          </button>
        </a>
      </Link>
    </li>
  );
}
