import { NextComponentType } from "next";

import Login from "../pages/login";
import { useAppSelector } from "../store/hooks";

export default function withAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    if (isLoggedIn === false) return <Login />;

    if (isLoggedIn) return <Component {...props} />;

    return <></>;
  };

  return Auth;
}
