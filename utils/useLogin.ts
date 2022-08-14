import { useRouter } from "next/router";

import { useAppSelector } from "../store/hooks";

export const useLogin = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();

  if (isLoggedIn === false) router.push("/login");

  return isLoggedIn;
};
