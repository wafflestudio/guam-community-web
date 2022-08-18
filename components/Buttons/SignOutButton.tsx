import { useRouter } from "next/router";
import React from "react";

import { signOut } from "../../store/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { firebaseSignOut } from "../../utils/firebaseUtils";

const SignOutButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logOut = async () => {
    await firebaseSignOut();
    dispatch(signOut);
    router.push("/login");
  };
  return <button onClick={logOut}>로그아웃</button>;
};

export default SignOutButton;
