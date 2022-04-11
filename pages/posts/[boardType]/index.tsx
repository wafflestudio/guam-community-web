import { useRouter } from "next/router";
import { useEffect } from "react";

import { useGetPostsByBoardQuery } from "../../../api/postsListApi";
import PageTitle from "../../../components/PageTitle";
import PostsPage from "../../../components/PostsPage/PostsPage";
import SignInForm from "../../../components/SignInForm";
import { boardList } from "../../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setPage } from "../../../store/pageSlice";

export default function Home() {
  const { page } = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(
      setPage(
        parseInt(
          typeof router.query.page === "string" ? router.query.page : "0"
        )
      )
    );
  }, [router.query.page]);

  const boardType = router.query.boardType;
  const boardId = boardList.find((board) => boardType === board.route)?.id;

  const result = useGetPostsByBoardQuery(
    { id: typeof boardId === "number" ? boardId : 0, page },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { isLoading, error } = result;

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
