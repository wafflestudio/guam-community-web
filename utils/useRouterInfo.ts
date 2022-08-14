import { useRouter } from "next/router";

import { boardList } from "../constants/constants";

const useRouterInfo = () => {
  const router = useRouter();
  const boardType = router.isReady && router.query.boardType;

  const boardId = boardList.find((board) => boardType === board.route)?.id;

  const page =
    typeof router.query.page === "string" ? parseInt(router.query.page) - 1 : 0;

  const keyword =
    typeof router.query.keyword === "string" && encodeURI(router.query.keyword);

  const userId =
    typeof router.query.userId === "string" &&
    typeof parseInt(router.query.userId) === "number"
      ? parseInt(router.query.userId)
      : undefined;

  const postId =
    typeof router.query.postId === "string" &&
    typeof parseInt(router.query.postId) === "number"
      ? parseInt(router.query.postId)
      : undefined;

  const pairId =
    typeof router.query.pairId === "string" &&
    typeof parseInt(router.query.pairId) === "number"
      ? parseInt(router.query.pairId)
      : undefined;

  return { boardType, boardId, page, keyword, userId, postId, pairId };
};

export default useRouterInfo;
