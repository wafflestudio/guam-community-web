import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppSelector } from "../store/hooks";

export const useLogin = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, []);

  return isLoggedIn;
};
