import PageTitle from "components/PageTitle";
import PostsPage from "components/PostsPage/PostsPage";
import { useAppSelector } from "store/hooks";
import { useGetSearchCountQuery, useGetSearchPostsQuery } from "store/postsApi";
import useRouterInfo from "utils/useRouterInfo";
import withAuth from "utils/withAuth";

const Search = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { page, keyword } = useRouterInfo();

  const { data, isLoading } = useGetSearchPostsQuery(
    { keyword: keyword!, page },
    {
      skip: page === undefined || keyword === undefined || !isLoggedIn,
    }
  );
  useGetSearchCountQuery(
    { keyword: keyword!, page },
    {
      skip: page === undefined || keyword === undefined || !isLoggedIn,
    }
  );

  return (
    <>
      <PageTitle
        title={`${typeof keyword === "string" && decodeURI(keyword)}`}
      />
      <PostsPage
        posts={data?.content}
        isLoading={isLoading}
        hasNext={data?.hasNext || false}
      />
    </>
  );
};

export default withAuth(Search);
