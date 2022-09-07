import Link from "next/link";
import { useRouter } from "next/router";

import ProfileFilledIcon from "assets/icons/profile/filled.svg";
import ProfileIcon from "assets/icons/profile/outlined.svg";

import styles from "./ProfileButton.module.scss";

export default function ProfileButton() {
  const router = useRouter();

  const isAtProfile = router.pathname.includes("profile");

  return (
    <li className={styles.profileButton}>
      <Link href={"/profile/me"}>
        <a>
          <button className={`${isAtProfile && styles.isAtProfile}`}>
            {isAtProfile ? <ProfileFilledIcon /> : <ProfileIcon />}
            <div className={styles["typo1-medium"]}>프로필</div>
          </button>
        </a>
      </Link>
    </li>
  );
}
