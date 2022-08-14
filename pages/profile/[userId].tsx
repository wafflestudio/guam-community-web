import React from "react";

import PageTitle from "../../components/PageTitle";
import ProfilePage from "../../components/ProfilePage/ProfilePage";
import { useAppSelector } from "../../store/hooks";
import { useGetUserQuery } from "../../store/postsApi";
import useRouterInfo from "../../utils/useRouterInfo";
import withAuth from "../../utils/withAuth";

const ProfileById = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { userId } = useRouterInfo();

  const user = useGetUserQuery(
    userId && typeof userId === "string" && typeof parseInt(userId) === "number"
      ? parseInt(userId)
      : 0,
    {
      skip:
        !userId ||
        typeof userId !== "string" ||
        typeof parseInt(userId) !== "number" ||
        !isLoggedIn,
    }
  );

  return (
    <>
      <PageTitle title={`${user.data?.nickname}`} />
      <ProfilePage />
    </>
  );
};

export default withAuth(ProfileById);
