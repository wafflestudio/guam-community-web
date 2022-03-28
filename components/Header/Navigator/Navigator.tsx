import HomeButton from "./HomeButton";
import MessageButton from "./MessageButton";
import NotificationButton from "./NotificationButton";
import ProfileButton from "./ProfileButton";

export default function Navigator() {
  return (
    <nav>
      <ul>
        <HomeButton />
        <MessageButton />
        <NotificationButton />
        <ProfileButton />
      </ul>
    </nav>
  );
}
