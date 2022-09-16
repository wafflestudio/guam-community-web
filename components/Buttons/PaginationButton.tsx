import { useRouter } from "next/router";
import React from "react";

import BackIcon from "assets/icons/back.svg";
import RightIcon from "assets/icons/right.svg";
import styles from "styles/PaginationButton.module.scss";
import useRouterInfo from "utils/useRouterInfo";

const PaginationButton = ({ hasNext }: { hasNext: boolean }) => {
  const router = useRouter();
  const { clientPage } = useRouterInfo();

  const onPrevClick = () => {
    if (clientPage >= 2)
      router.push({
        query: { ...router.query, page: clientPage - 1 },
      });
  };

  const onNextClick = () => {
    if (hasNext)
      router.push({
        query: { ...router.query, page: clientPage + 1 },
      });
  };

  return (
    <div className={styles.buttonsList}>
      <button disabled={clientPage <= 1} onClick={onPrevClick}>
        <BackIcon />
      </button>
      <button disabled={!hasNext} onClick={onNextClick}>
        <RightIcon />
      </button>
    </div>
  );
};

export default PaginationButton;
