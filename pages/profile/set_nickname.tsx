import { useRouter } from "next/router";

import SetNickname from "components/SignIn/SetNickname";
import { useAppSelector } from "store/hooks";
import withAuth from "utils/withAuth";

const SetNicknamePage = () => {
  const { profileSet } = useAppSelector((state) => state.user);
  const router = useRouter();

  if (profileSet) {
    router.push("/");
    return null;
  }

  return <SetNickname />;
};

export default withAuth(SetNicknamePage);
