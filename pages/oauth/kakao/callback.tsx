import axios from "axios";
import { useRouter } from "next/router";
import qs from "qs";
import { useEffect } from "react";

import { setKakaoToken } from "../../../store/authSlice";
import { useAppDispatch } from "../../../store/hooks";

export default function Auth() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { code } = router.query;

  const REST_API_KEY = process.env.REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

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

        dispatch(setKakaoToken(data.access_token));
      } catch (err) {
        console.log(err);
      }
    };

    if (router.isReady) getToken();
  }, [router]);

  return null;
}
