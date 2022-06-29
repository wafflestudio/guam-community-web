import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { useGetPostsByBoardQuery } from "../../../api/postsApi";
import PageTitle from "../../../components/PageTitle";
import PostsPage from "../../../components/PostsPage/PostsPage";
import { boardList } from "../../../constants/constants";
import { useAppSelector } from "../../../store/hooks";

export default function Home() {
  const [boardId, setBoardId] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined);

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const page = useMemo(() => router.isReady && router.query.page, [router]);
  const boardType = useMemo(
    () => router.isReady && router.query.boardType,
    [router]
  );

  useEffect(() => {
    if (!router.isReady) return;

    if (page === undefined) {
      setCurrentPage(0);
      return;
    }

    if (typeof page === "string" && parseInt(page) >= 1) {
      setCurrentPage(parseInt(page) - 1);
    } else {
      router.push("/404");
    }
  }, [page, router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;

    if (boardType === undefined) return;

    const id = boardList.find((board) => boardType === board.route)?.id;
    if (typeof id === "number") setBoardId(id);
    else router.push("404");
  }, [boardType, router.isReady]);

  useGetPostsByBoardQuery(
    { boardId, page: currentPage },
    {
      refetchOnMountOrArgChange: true,
      skip:
        currentPage === undefined ||
        boardId === undefined ||
        isLoggedIn === undefined,
    }
  );

  return (
    <>
      <PageTitle
        title={`${typeof boardType === "string" && boardType.toUpperCase()}`}
      />
      <PostsPage />
    </>
  );
}
