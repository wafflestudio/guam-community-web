import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { NextRouter } from "next/router";

import { signIn } from "store/authSlice";
import { setUserState } from "store/userSlice";

export const setProfile = async (
  token: string,
  router: NextRouter,
  dispatch: Dispatch<any>
) => {
  const { data: userData } = await axios.get("/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  dispatch(setUserState(userData));
  dispatch(signIn());

  if (
    !userData.profileSet &&
    router.isReady &&
    router.pathname !== "/profile/set_nickname"
  )
    router.push("/profile/set_nickname");
};
