import HomeButton from "./NavigatorButtons/HomeButton";
import MessageButton from "./NavigatorButtons/MessageButton";
import NotificationButton from "./NavigatorButtons/NotificationButton";
import ProfileButton from "./NavigatorButtons/ProfileButton";

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
