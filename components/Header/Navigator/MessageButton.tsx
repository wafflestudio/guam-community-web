import MessageIcon from "../../../assets/icons/message/default.svg";

import styles from "./MessageButton.module.scss";

export default function MessageButton() {
  return (
    <li className={styles.messageButton}>
      <button>
        <MessageIcon />
        <div className={styles["typo1-medium"]}>쪽지함</div>
      </button>
    </li>
  );
}
