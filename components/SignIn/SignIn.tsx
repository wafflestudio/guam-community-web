import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebase from "firebase/compat/app";
import Link from "next/link";
import { useRouter } from "next/router";

import GoogleIcon from "../../assets/icons/logo/google.svg";
import KaKaoIcon from "../../assets/icons/logo/kakao.svg";
import RightIcon from "../../assets/icons/right.svg";
import { useAppDispatch } from "../../store/hooks";
import { setUserState } from "../../store/userSlice";
import { getFirebaseIdToken } from "../../utils/firebaseUtils";

import LeftGuam from "./LeftGuam";

import styles from "./SignIn.module.scss";

export default function SignIn() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(getAuth(), provider);

    const token = await getFirebaseIdToken();

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data: userData } = await axios.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setUserState(userData));

    if (!userData.profileSet) router.push("/profile/set_nickname");
    else router.push("/");
  };

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
          <button className={`${styles.googleLogin}`} onClick={googleSignIn}>
            <GoogleIcon />
            <span className={`${styles["typo5-medium"]} ${styles.text}`}>
              구글로 시작하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
