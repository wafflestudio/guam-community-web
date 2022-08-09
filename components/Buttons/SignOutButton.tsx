import { useRouter } from "next/router";
import React from "react";

import { firebaseSignOut } from "../../utils/firebaseUtils";

const SignOutButton = () => {
  const router = useRouter();
  const signOut = () => {
    firebaseSignOut();
    router.push("/");
  };
  return <button onClick={signOut}>로그아웃</button>;
};

export default SignOutButton;
