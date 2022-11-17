import React from "react";

import PostsList from "components/pages/posts/PostsList/PostsList";
import PageTitle from "components/PageTitle";
import { useAppSelector } from "store/hooks";
import { useGetScrappedPostsQuery } from "store/postsApi";
import useRouterInfo from "utils/useRouterInfo";
import withAuth from "utils/withAuth";

const Scrapped = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { id: userId } = useAppSelector((state) => state.user);

  const { page } = useRouterInfo();

  const { data, isLoading } = useGetScrappedPostsQuery(
    { userId, page },
    {
      skip: page === undefined || !isLoggedIn || userId === null,
    }
  );

  return (
    <>
      <PageTitle title={"Guam | 스크랩한 글"} />
      <PostsList
        posts={data?.content}
        isLoading={isLoading}
        hasNext={data?.hasNext || false}
      />
    </>
  );
};

export default withAuth(Scrapped);
