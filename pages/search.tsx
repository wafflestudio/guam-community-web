import PageTitle from "../components/PageTitle";
import PostsPage from "../components/PostsPage/PostsPage";
import { useAppSelector } from "../store/hooks";
import { useGetSearchPostsQuery } from "../store/postsApi";
import useRouterInfo from "../utils/useRouterInfo";

export default function Home() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { page, keyword } = useRouterInfo();

  const { data, isLoading } = useGetSearchPostsQuery(
    { keyword: keyword || "", page },
    {
      refetchOnMountOrArgChange: true,
      skip: page === undefined || keyword === undefined || !isLoggedIn,
    }
  );

  return (
    <>
      <PageTitle
        title={`${typeof keyword === "string" && decodeURI(keyword)}`}
      />
      <PostsPage posts={data?.content} isLoading={isLoading} />
    </>
  );
}
