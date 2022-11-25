import Link from "next/link";
import { useRouter } from "next/router";

import styles from "styles/UserSide.module.scss";

export default function UserSide() {
  const pathName = useRouter().pathname;

  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <a
          className={
            pathName === "/profile/setting"
              ? styles.selectedText
              : styles.defaultText
          }
        >
          프로필 수정
        </a>
      </Link>
      <Link href={"/"}>
        <a
          className={pathName === "" ? styles.selectedText : styles.defaultText}
        >
          내가 쓴 글
        </a>
      </Link>
      <Link href={"/"}>
        <a
          className={pathName === "" ? styles.selectedText : styles.defaultText}
        >
          차단 목록 관리
        </a>
      </Link>
      <Link href={"/"}>
        <a
          className={pathName === "" ? styles.selectedText : styles.defaultText}
        >
          스크랩한 글
        </a>
      </Link>
      <Link href={"/"}>
        <a className={styles.logOutText}>로그아웃</a>
      </Link>
    </div>
  );
}
