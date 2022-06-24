import axios from "axios";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithCustomToken,
} from "firebase/auth";
import { useRouter } from "next/router";
import qs from "qs";
import { useEffect } from "react";

import { useAppDispatch } from "../../../store/hooks";
import { setUserState } from "../../../store/userSlice";
import { getFirebaseIdToken } from "../../../utils/firebaseUtils";

export default function Auth() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { code } = router.query;

  const REST_API_KEY = process.env.REST_API_KEY;
  const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

  const auth = getAuth();

  useEffect(() => {
    const getToken = async () => {
      const payload = qs.stringify({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: code,
        client_secret: CLIENT_SECRET,
      });

      try {
        const { data } = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          payload
        );
        const kakaoToken = data.access_token;

        const { data: customTokenData } = await axios.get(
          `/guam-immigration/token?kakaoToken=${kakaoToken}`
        );

        await setPersistence(auth, browserLocalPersistence);
        await signInWithCustomToken(auth, customTokenData.customToken);

        const token = await getFirebaseIdToken();

        const { data: userData } = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setUserState(userData));

        if (!userData.profileSet) router.push("/profile/set_nickname");
        else router.push("/");
      } catch (e) {
        console.log(e);
      }
    };

    if (router.isReady) getToken();
  }, [CLIENT_SECRET, REST_API_KEY, code]);

  return null;
}
