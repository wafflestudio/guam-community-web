import { postsApi } from "store/postsApi";
import styles from "styles/PostsPage.module.scss";
import useRouterInfo from "utils/useRouterInfo";

export default function PostWriteMessage() {
  const { keyword, page } = useRouterInfo();
  const { data: count } = postsApi.endpoints.getSearchCount.useQueryState({
    keyword: keyword!,
    page,
  });

  return (
    <div className={styles.writeContainer}>
      <span className={styles["typo5-medium"]} id={styles.specials}>
        {keyword ? (
          <>
            <span className={styles.keyword}>{decodeURI(keyword)}</span>
            <span className={styles.search}>의 검색 결과</span>
            <span
              className={`${styles.searchCount} ${styles["typo2-regular"]}`}
            >
              {count}건
            </span>
          </>
        ) : (
          "특별한 일이 있나요? ✨"
        )}
      </span>
    </div>
  );
}
