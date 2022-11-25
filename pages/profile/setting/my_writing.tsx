import React from "react";

import PostsList from "components/pages/posts/PostsList/PostsList";
import ProfileSideWrapper from "components/pages/setProfile/ProfileSideWrapper";
import PageTitle from "components/PageTitle";
import { useAppSelector } from "store/hooks";
import { useGetMyPostsQuery } from "store/postsApi";
import withAuth from "utils/withAuth";

const MyWriting = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { id: userId } = useAppSelector((state) => state.user);

  const { data, isLoading } = useGetMyPostsQuery(userId!, {
    skip: !isLoggedIn || userId === null,
  });

  return (
    <ProfileSideWrapper>
      <PageTitle title={"Guam | 내가 쓴 글"} />
      <PostsList
        posts={data?.content}
        isLoading={isLoading}
        hasNext={data?.hasNext || false}
      />
    </ProfileSideWrapper>
  );
};

export default withAuth(MyWriting);
