import PageTitle from "../../components/PageTitle";
import PostsPage from "../../components/PostsPage/PostsPage";
import { useAppSelector } from "../../store/hooks";
import { useGetPostsByBoardQuery } from "../../store/postsApi";
import useRouterInfo from "../../utils/useRouterInfo";

export default function Home() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { page, boardId, boardType } = useRouterInfo();

  const { data, isLoading } = useGetPostsByBoardQuery(
    { boardId, page },
    {
      refetchOnMountOrArgChange: true,
      skip:
        page === undefined || boardId === undefined || isLoggedIn === undefined,
    }
  );

  return (
    <>
      <PageTitle
        title={`${typeof boardType === "string" && boardType.toUpperCase()}`}
      />
      <PostsPage posts={data?.content} isLoading={isLoading} />
    </>
  );
}
