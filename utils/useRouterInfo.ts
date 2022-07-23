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

  return { boardType, boardId, page, keyword };
};

export default useRouterInfo;
