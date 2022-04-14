import { useRouter } from "next/router";
import { useEffect } from "react";

import { useGetPostsByBoardQuery } from "../../../api/postsListApi";
import PageTitle from "../../../components/PageTitle";
import PostsPage from "../../../components/PostsPage/PostsPage";
import SignInForm from "../../../components/SignInForm";
import { boardList } from "../../../constants/constants";
import { useAppDispatch } from "../../../store/hooks";
import { setPage } from "../../../store/pageSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const currentPage =
    typeof router.query.page === "string" && parseInt(router.query.page) >= 1
      ? parseInt(router.query.page) - 1
      : 0;

  useEffect(() => {
    dispatch(setPage(currentPage));
  }, [router.query.page]);

  const boardType = router.query.boardType;
  const boardId = boardList.find((board) => boardType === board.route)?.id;

  const { isLoading, error } = useGetPostsByBoardQuery(
    { id: typeof boardId === "number" ? boardId : 0, page: currentPage },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <>
      <PageTitle
        title={`${typeof boardType === "string" && boardType.toUpperCase()}`}
      />
      <SignInForm />
      {error ? <>error</> : isLoading ? <>Loading...</> : null}
      <PostsPage />
    </>
  );
}
