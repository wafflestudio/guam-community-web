import { NextComponentType } from "next";

import { useRouter } from "next/router";

import { useAppSelector } from "../store/hooks";

export default function withAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    const router = useRouter();

    if (isLoggedIn === false) router.push("/login");

    if (isLoggedIn) return <Component {...props} />;

    return <></>;
  };

  return Auth;
}
