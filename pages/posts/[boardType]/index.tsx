import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";

import {
  getPostsByBoard,
  getRunningOperationPromises,
  useGetPostsByBoardQuery,
} from "../../../api/postsListApi";
import PageTitle from "../../../components/PageTitle";
import PostsPage from "../../../components/PostsPage/PostsPage";
import SignInForm from "../../../components/SignInForm";
import { boardList } from "../../../constants/constants";
import { useAppSelector } from "../../../store/hooks";
import { wrapper } from "../../../store/store";

// export async function getStaticPaths() {
//   return {
//     paths: boardList.map((board) => `/posts/${board.id}`),
//     fallback: true,
//   };
// }

export default function Home() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const boardType = router.query.boardType;
  const boardId = boardList.find((board) => boardType === board.route)?.id;

  const result = useGetPostsByBoardQuery(
    typeof boardId === "number" ? boardId : skipToken,
    {
      skip: router.isFallback || !!!isLoggedIn,
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
      {error ? (
        <>error</>
      ) : router.isFallback || isLoading ? (
        <>Loading...</>
      ) : null}
      <PostsPage />
    </>
  );
}

// export const getStaticProps = wrapper.getStaticProps(
//   (store) => async (context) => {
//     const boardId = context.params?.boardId;

//     if (typeof boardId === "number") {
//       store.dispatch(getPostsByBoard.initiate(boardId));
//     }

//     await Promise.all(getRunningOperationPromises());

//     return {
//       props: {},
//     };
//   }
// );
