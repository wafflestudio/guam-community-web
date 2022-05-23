import UserBlockModal from "../Modals/UserBlockModal/UserBlockModal";
import UserReportModal from "../Modals/UserReportModal/UserReportModal";

import MessagesBox from "./MessageBox";
import MessagesSide from "./MessagesSide";

import styles from "./Messages.module.scss";

export default function MessagesPage() {
  return (
    <div className={styles.container}>
      <MessagesSide />
      <MessagesBox />
      <UserReportModal />
      <UserBlockModal />
    </div>
  );
}
