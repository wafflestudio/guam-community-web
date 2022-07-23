import React from "react";

import { useGetUserQuery } from "../../api/postsApi";
import PageTitle from "../../components/PageTitle";
import ProfilePage from "../../components/ProfilePage/ProfilePage";
import { useLogin } from "../../utils/useLogin";
import useRouterInfo from "../../utils/useRouterInfo";

const ProfileById = () => {
  const isLoggedIn = useLogin();

  const { userId } = useRouterInfo();

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
