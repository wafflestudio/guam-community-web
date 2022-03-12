import HomeButton from "./HomeButton";
import MessageButton from "./MessageButton";
import styles from "./Navigator.module.scss";
import NotificationButton from "./NotificationButton";
import ProfileButton from "./ProfileButton";

export default function Navigator() {
  return (
    <nav className={styles.container}>
      <ul>
        <HomeButton />
        <MessageButton />
        <NotificationButton />
        <ProfileButton />
      </ul>
    </nav>
  );
}
