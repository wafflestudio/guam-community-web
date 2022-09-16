import styles from "styles/Messages.module.scss";

import MessagesBox from "./MessageBox";
import MessagesSide from "./MessagesSide";

export default function MessagesPage() {
  return (
    <div className={styles.container}>
      <MessagesSide />
      <MessagesBox />
    </div>
  );
}
