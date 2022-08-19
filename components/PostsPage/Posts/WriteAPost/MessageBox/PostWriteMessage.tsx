import useRouterInfo from "../../../../../utils/useRouterInfo";

import styles from "./PostWriteMessage.module.scss";

export default function PostWriteMessage() {
  const { keyword } = useRouterInfo();
  return (
    <div className={styles.container}>
      <span className={styles["typo5-medium"]} id={styles.specials}>
        {keyword ? (
          <>
            <span className={styles.keyword}>{decodeURI(keyword)}</span>
            <span className={styles.search}>의 검색 결과</span>
          </>
        ) : (
          "특별한 일이 있나요? ✨"
        )}
      </span>
    </div>
  );
}
