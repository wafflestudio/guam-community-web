import Link from "next/link";
import { useRouter } from "next/router";

import MessageIcon from "../../../assets/icons/message/default.svg";

import styles from "./MessageButton.module.scss";

export default function MessageButton() {
  const router = useRouter();

  return (
    <li className={styles.messageButton}>
      <Link href={"/messages"}>
        <a>
          <button
            className={`${
              router.pathname === "/messages" && styles.isAtMessages
            }`}
          >
            <MessageIcon />
            <div className={styles["typo1-medium"]}>쪽지함</div>
          </button>
        </a>
      </Link>
    </li>
  );
}
