import { useRouter } from "next/router";
import React from "react";
import { batch } from "react-redux";

import { signOut } from "store/authSlice";
import { useAppDispatch } from "store/hooks";
import { removeUserState } from "store/userSlice";
import { firebaseSignOut } from "utils/firebaseUtils";

const SignOutButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logOut = async () => {
    await firebaseSignOut();
    batch(() => {
      dispatch(signOut);
      dispatch(removeUserState);
    });
    router.push("/login");
  };
  return <button onClick={logOut}>로그아웃</button>;
};

export default SignOutButton;
