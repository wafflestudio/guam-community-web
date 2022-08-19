import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";

import GoogleIcon from "../../assets/icons/logo/google.svg";
import KaKaoIcon from "../../assets/icons/logo/kakao.svg";
import RightIcon from "../../assets/icons/right.svg";
import { signIn } from "../../store/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { setToast } from "../../store/toastSlice";
import { setUserState } from "../../store/userSlice";
import { getFirebaseIdToken } from "../../utils/firebaseUtils";

import styles from "./SignIn.module.scss";

export default function SignIn() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(getAuth(), provider);

      const token = await getFirebaseIdToken();

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data: userData } = await axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userData.profileSet) router.push("/profile/set_nickname");
      else {
        dispatch(setUserState(userData));
        router.push("/");
      }
    } catch (e) {
      console.log(e);
      dispatch(setToast("구글 로그인 실패"));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.introduction}>
        <div>
          <div className={styles.logo}>
            <img src="/favicon.svg" alt="괌 로고" />
            <div className={`${styles.guam} typo-guam-main`}>Guam</div>
          </div>
          <div className={`${styles.description} typo8-medium`}>
            IT인들을 위한, IT인들의 커뮤니티.
          </div>
        </div>
      </div>
      <div className={styles.background}>
        <div className={styles.login}>
          <div className={styles.buttonList}>
            <Link href={"/oauth/authorize/kakao"}>
              <a>
                <button className={`${styles.kakaoLogin}`}>
                  <KaKaoIcon />
                  카카오톡으로 시작하기
                </button>
              </a>
            </Link>
            <button onClick={googleSignIn} className={styles.googleLogin}>
              <GoogleIcon />
              구글로 시작하기
            </button>
            <Link href={"/"}>
              <a>
                <button className={styles.toHome}>
                  괌 둘러보기 <RightIcon />
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
