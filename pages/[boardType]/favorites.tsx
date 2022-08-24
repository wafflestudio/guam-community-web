import PageTitle from "../../components/PageTitle";
import PostsPage from "../../components/PostsPage/PostsPage";
import { useAppSelector } from "../../store/hooks";
import { useGetFavoritePostsQuery } from "../../store/postsApi";
import useRouterInfo from "../../utils/useRouterInfo";
import withAuth from "../../utils/withAuth";

const Favorites = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { page, boardId, boardType } = useRouterInfo();

  const { data, isLoading } = useGetFavoritePostsQuery(
    { boardId: boardId!, rankFrom: page * 20 },
    {
      skip: page === undefined || boardId === undefined || !isLoggedIn,
    }
  );

  return (
    <>
      <PageTitle
        title={`${typeof boardType === "string" && boardType.toUpperCase()}`}
      />
      <PostsPage posts={data?.content} isLoading={isLoading} hasNext={true} />
    </>
  );
};

export default withAuth(Favorites);
