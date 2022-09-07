import { useRouter } from "next/router";

import useRouterInfo from "utils/useRouterInfo";

import styles from "./PostsArrangeButtons.module.scss";

export default function PostsArrangeButtons() {
  const router = useRouter();
  const { boardType } = useRouterInfo();

  const onClickMode = (recommend: boolean) => {
    if (router.pathname === "/") router.push("/favorites");
    else if (router.pathname === "/favorites") router.push("/");
    else if (boardType)
      router.push(`/${boardType}${recommend ? "/favorites" : ""}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles["typo2-medium"]} ${
          router.pathname.includes("favorites") && styles.selected
        }`}
        onClick={() => onClickMode(true)}
        id={styles.recommend}
      >
        추천순
      </button>
      <button
        className={`${styles["typo2-medium"]} ${
          !router.pathname.includes("favorites") && styles.selected
        }`}
        onClick={() => onClickMode(false)}
        id={styles.time}
      >
        시간순
      </button>
    </div>
  );
}
