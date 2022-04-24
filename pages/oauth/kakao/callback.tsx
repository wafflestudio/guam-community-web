import axios from "axios";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useRouter } from "next/router";
import qs from "qs";
import { useEffect } from "react";

import { setToken } from "../../../store/authSlice";
import { useAppDispatch } from "../../../store/hooks";
import { setUserState } from "../../../store/userSlice";

export default function Auth() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { code } = router.query;

  const REST_API_KEY = process.env.REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
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

        try {
          const { data } = await axios.get(
            `/guam-immigration/token?kakaoToken=${kakaoToken}`
          );

          signInWithCustomToken(auth, data.customToken)
            .then(async (response: any) => {
              dispatch(setToken(response.user.accessToken));

              const { data } = await axios.get("/api/users/me", {
                headers: {
                  Authorization: `Bearer ${response.user.accessToken}`,
                },
              });

              dispatch(setUserState(data));

              if (!data.profileSet) router.push("/set_profile");
              else router.push("/");
            })
            .catch((e) => {
              console.log(e);
            });
        } catch (e) {
          console.log(e);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (router.isReady) getToken();
  }, [CLIENT_SECRET, REST_API_KEY, code, dispatch, router]);

  return null;
}
