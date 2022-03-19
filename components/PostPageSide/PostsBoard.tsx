import Link from "next/link";
import { useRouter } from "next/router";

import AnonymousActiveIcon from "../../assets/icons/board/anonymous-active.svg";
import AnonymousIcon from "../../assets/icons/board/anonymous.svg";
import FeedActiveIcon from "../../assets/icons/board/feed-active.svg";
import FeedIcon from "../../assets/icons/board/feed.svg";
import FreeActiveIcon from "../../assets/icons/board/free-active.svg";
import FreeIcon from "../../assets/icons/board/free.svg";
import HRActiveIcon from "../../assets/icons/board/hr-active.svg";
import HRIcon from "../../assets/icons/board/hr.svg";
import InfoActiveIcon from "../../assets/icons/board/info-active.svg";
import InfoIcon from "../../assets/icons/board/info.svg";

import styles from "./PostsBoard.module.scss";

export default function PostsBoard() {
  const router = useRouter();
  const isSelected = (route: string) => router.query.boardType === route;

  return (
    <div className={styles.container}>
      <div className={`${styles["typo5-medium"]} ${styles.title}`}>게시판</div>
      <hr />
      <nav>
        <ul>
          <li>
            <Link href={"/"}>
              <a>
                <button
                  className={`${styles["typo4-medium"]} ${styles.listItem} ${
                    styles.all
                  } ${router.pathname === "/" && styles.isSelected}`}
                >
                  {router.pathname === "/" ? <FeedActiveIcon /> : <FeedIcon />}
                  <span>전체 게시판</span>
                </button>
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/posts/free"}>
              <a>
                <button
                  className={`${styles["typo4-medium"]} ${styles.listItem} ${
                    styles.free
                  } ${isSelected("free") && styles.isSelected}`}
                >
                  {isSelected("free") ? <FreeActiveIcon /> : <FreeIcon />}
                  <span>자유 게시판</span>
                </button>
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/posts/anonymous"}>
              <a>
                <button
                  className={`${styles["typo4-medium"]} ${styles.listItem} ${
                    styles.anonymous
                  } ${isSelected("anonymous") && styles.isSelected}`}
                >
                  {isSelected("anonymous") ? (
                    <AnonymousActiveIcon />
                  ) : (
                    <AnonymousIcon />
                  )}
                  <span>익명 게시판</span>
                </button>
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/posts/information"}>
              <a>
                <button
                  className={`${styles["typo4-medium"]} ${styles.listItem} ${
                    styles.info
                  } ${isSelected("information") && styles.isSelected}`}
                >
                  {isSelected("information") ? (
                    <InfoActiveIcon />
                  ) : (
                    <InfoIcon />
                  )}
                  <span>정보공유 게시판</span>
                </button>
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/posts/career"}>
              <a>
                <button
                  className={`${styles["typo4-medium"]} ${styles.listItem} ${
                    styles.career
                  } ${isSelected("career") && styles.isSelected}`}
                >
                  {isSelected("career") ? <HRActiveIcon /> : <HRIcon />}
                  <span>구인 게시판</span>
                </button>
              </a>
            </Link>
          </li>
          {/* <li className={`${styles["typo4-medium"]} ${styles.listItem} ${styles.ad}`}>
            <span>홍보 게시판</span>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}
