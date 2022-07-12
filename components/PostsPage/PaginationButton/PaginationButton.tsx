import { useRouter } from "next/router";
import React from "react";

import { postsApi } from "../../../api/postsApi";
import BackIcon from "../../../assets/icons/back.svg";
import RightIcon from "../../../assets/icons/right.svg";
import useRouterInfo from "../../../utils/useRouterInfo";

import styles from "./PaginationButton.module.scss";

const PaginationButton = () => {
  const router = useRouter();
  const currentPage = router.query.page || "1";

  const onPrevClick = () => {
    if (typeof currentPage === "string" && parseInt(currentPage) !== 1)
      router.replace({
        query: { ...router.query, page: parseInt(currentPage) - 1 },
      });
  };

  const onNextClick = () => {
    if (typeof currentPage === "string") {
      console.log("asdf");
      router.replace({
        query: { ...router.query, page: parseInt(currentPage) + 1 },
      });
    }
  };

  const { boardId, page, keyword } = useRouterInfo();

  const hasNext =
    typeof boardId === "number"
      ? postsApi.endpoints.getPostsByBoard.useQueryState({
          boardId,
          page,
        }).data?.hasNext
      : typeof keyword === "string"
      ? postsApi.endpoints.getSearchPosts.useQueryState({ keyword, page }).data
          ?.hasNext
      : postsApi.endpoints.getAllPosts.useQueryState(page).data?.hasNext;

  return (
    <div className={styles.buttonsList}>
      <button
        disabled={
          typeof currentPage === "string" && parseInt(currentPage) === 1
        }
        onClick={onPrevClick}
      >
        <BackIcon />
      </button>
      <button disabled={!hasNext} onClick={onNextClick}>
        <RightIcon />
      </button>
    </div>
  );
};

export default PaginationButton;
