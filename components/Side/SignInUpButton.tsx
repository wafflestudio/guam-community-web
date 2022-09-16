import { useRouter } from "next/router";

import styles from "styles/Side.module.scss";

export default function SignInUpButton() {
  const router = useRouter();

  const onClick = () => router.push("/login");

  return (
    <button className={styles.signInUp} onClick={onClick}>
      <span className={`${styles["typo5-medium"]} ${styles.text}`}>
        로그인/회원가입
      </span>
    </button>
  );
}
