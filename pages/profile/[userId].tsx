import { useRouter } from "next/router";
import React from "react";

import ProfilePage from "components/pages/profile/ProfilePage";
import PageTitle from "components/PageTitle";
import { useAppSelector } from "store/hooks";
import { useGetUserQuery } from "store/postsApi";
import useRouterInfo from "utils/useRouterInfo";
import withAuth from "utils/withAuth";

const ProfileById = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { id } = useAppSelector((state) => state.user);

  const router = useRouter();
  const { userId } = useRouterInfo();

  const user = useGetUserQuery(userId!, {
    skip: !userId || !isLoggedIn,
  });

  if (userId === id) router.push("/profile/me");

  return (
    <React.Fragment key={userId}>
      <PageTitle title={`${user.data?.nickname}`} />
      <ProfilePage />
    </React.Fragment>
  );
};

export default withAuth(ProfileById);
