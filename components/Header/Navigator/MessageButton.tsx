import styles from "./MessageButton.module.scss";
import MessageIcon from "../../../assets/icons/message/default.svg";

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
