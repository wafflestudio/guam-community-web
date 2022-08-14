import PageTitle from "../components/PageTitle";
import PostsPage from "../components/PostsPage/PostsPage";
import { useGetSearchPostsQuery } from "../store/postsApi";
import { useLogin } from "../utils/useLogin";
import useRouterInfo from "../utils/useRouterInfo";

export default function Home() {
  const isLoggedIn = useLogin();

  const { page, keyword } = useRouterInfo();

  useGetSearchPostsQuery(
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
      <PostsPage />
    </>
  );
}
