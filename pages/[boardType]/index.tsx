import PostsPage from "components/pages/posts/PostsPage";
import PageTitle from "components/PageTitle";
import { boardList } from "constants/constants";
import { useAppSelector } from "store/hooks";
import { useGetPostsByBoardQuery } from "store/postsApi";
import useRouterInfo from "utils/useRouterInfo";

export default function Home() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { page, boardId, boardType } = useRouterInfo();

  const { data, isLoading } = useGetPostsByBoardQuery(
    { boardId, page },
    {
      skip:
        page === undefined || boardId === undefined || isLoggedIn === undefined,
    }
  );

  return (
    <>
      <PageTitle
        title={`${typeof boardType === "string" && boardType.toUpperCase()}`}
      />
      <PostsPage
        posts={data?.content}
        isLoading={isLoading}
        hasNext={data?.hasNext || false}
      />
    </>
  );
}

export async function getStaticPaths() {
  const paths = boardList.slice(1).map((board) => ({
    params: { boardType: board.route },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
