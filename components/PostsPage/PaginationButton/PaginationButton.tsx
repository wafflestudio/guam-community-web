import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import BackIcon from "../../../assets/icons/back.svg";
import RightIcon from "../../../assets/icons/right.svg";

import styles from "./PaginationButton.module.scss";

const PaginationButton = ({ pageNum }: { pageNum: number }) => {
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

  return (
    <div className={styles.buttonsList}>
      <button onClick={onPrevClick}>
        <BackIcon />
      </button>
      <ul>
        {Array.from(Array(pageNum).keys()).map((page) => (
          <li
            className={`${
              typeof currentPage === "string" &&
              page + 1 === parseInt(currentPage) &&
              styles.selected
            }`}
            key={page}
          >
            <Link href={`${router.pathname}?page=${page + 1}`}>
              <a className={`${styles["typo4-regular"]}`}>
                <button>{page + 1}</button>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={onNextClick}>
        <RightIcon />
      </button>
    </div>
  );
};

export default PaginationButton;
