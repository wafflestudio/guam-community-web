import SettingPage from "components/pages/ProfileSetting/SettingPage/SettingPage";
import UserSide from "components/UserSide/UserSide";
import styles from "styles/ProfileSettingPage.module.scss";

export default function ProfileSettingPage() {
  return (
    <div className={styles.container}>
      <UserSide />
      <SettingPage />
    </div>
  );
}
