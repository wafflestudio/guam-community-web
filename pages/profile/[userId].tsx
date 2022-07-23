import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useGetUserQuery } from "../../api/postsApi";
import PageTitle from "../../components/PageTitle";
import ProfilePage from "../../components/ProfilePage/ProfilePage";
import { useAppSelector } from "../../store/hooks";
import useRouterInfo from "../../utils/useRouterInfo";

const ProfileById = () => {
  const { userId } = useRouterInfo();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, []);

  const user = useGetUserQuery(parseInt(userId), {
    skip:
      !userId ||
      typeof userId !== "string" ||
      typeof parseInt(userId) !== "number" ||
      !isLoggedIn,
  });

  return (
    <>
      <PageTitle title={`${user.data?.nickname}`} />
      <ProfilePage />
    </>
  );
};

export default ProfileById;
