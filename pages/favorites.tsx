import PageTitle from "components/PageTitle";
import PostsPage from "components/PostsPage/PostsPage";
import { useAppSelector } from "store/hooks";
import { useGetFavoritePostsQuery } from "store/postsApi";
import useRouterInfo from "utils/useRouterInfo";
import withAuth from "utils/withAuth";

const Favorites = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { page } = useRouterInfo();

  const { data, isLoading } = useGetFavoritePostsQuery(
    { rankFrom: page * 20 },
    {
      skip: page === undefined || !isLoggedIn,
    }
  );

  return (
    <>
      <PageTitle title={"Guam | 전체 게시판"} />
      <PostsPage posts={data?.content} isLoading={isLoading} hasNext={true} />
    </>
  );
};

export default withAuth(Favorites);
