import Link from "next/link";

import GoogleIcon from "../../assets/icons/logo/google.svg";
import KaKaoIcon from "../../assets/icons/logo/kakao.svg";
import RightIcon from "../../assets/icons/right.svg";

import LeftGuam from "./LeftGuam";

import styles from "./SignIn.module.scss";

export default function SignIn() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <LeftGuam />
        <div className={styles.rightMenu}>
          <div className={`${styles["typo8-medium"]} ${styles.info}`}>
            IT인들을 위한,
            <br /> IT인들의 커뮤니티
          </div>
          <Link href={"/"}>
            <a>
              <button className={styles.home}>
                <span className={`${styles["typo5-medium"]} ${styles.text}`}>
                  둘러보기
                </span>
                <RightIcon />
              </button>
            </a>
          </Link>
          <Link href={"/oauth/authorize/kakao"}>
            <a>
              <button className={`${styles.kakaoLogin}`}>
                <KaKaoIcon />
                <span className={`${styles["typo5-medium"]} ${styles.text}`}>
                  카카오톡으로 시작하기
                </span>
              </button>
            </a>
          </Link>
          <Link href={"/oauth/authorize/google"}>
            <a>
              <button className={`${styles.googleLogin}`}>
                <GoogleIcon />
                <span className={`${styles["typo5-medium"]} ${styles.text}`}>
                  구글로 시작하기
                </span>
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
