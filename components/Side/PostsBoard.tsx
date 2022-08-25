import Link from "next/link";
import { useRouter } from "next/router";

import AdActiveIcon from "../../assets/icons/board/ad-active.svg";
import AdIcon from "../../assets/icons/board/ad.svg";
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
import {
  AD,
  ANONYMOUS,
  CAREER,
  FREE,
  INFORMATION,
} from "../../constants/constants";

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
                  } ${
                    (router.pathname === "/" ||
                      router.pathname === "/favorites") &&
                    styles.isSelected
                  }`}
                >
                  {router.pathname === "/" ? <FeedActiveIcon /> : <FeedIcon />}
                  <span>전체 게시판</span>
                </button>
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/${FREE}`}>
              <a>
                <button
                  className={`${styles["typo4-medium"]} ${styles.listItem} ${
                    styles.free
                  } ${isSelected(FREE) && styles.isSelected}`}
                >
                  {isSelected(FREE) ? <FreeActiveIcon /> : <FreeIcon />}
                  <span>자유 게시판</span>
                </button>
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/${ANONYMOUS}`}>
              <a>
                <button
                  className={`${styles["typo4-medium"]} ${styles.listItem} ${
                    styles.anonymous
                  } ${isSelected(ANONYMOUS) && styles.isSelected}`}
                >
                  {isSelected(ANONYMOUS) ? (
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
            <Link href={`/${INFORMATION}`}>
              <a>
                <button
                  className={`${styles["typo4-medium"]} ${styles.listItem} ${
                    styles.info
                  } ${isSelected(INFORMATION) && styles.isSelected}`}
                >
                  {isSelected(INFORMATION) ? <InfoActiveIcon /> : <InfoIcon />}
                  <span>정보공유 게시판</span>
                </button>
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/${CAREER}`}>
              <a>
                <button
                  className={`${styles["typo4-medium"]} ${styles.listItem} ${
                    styles.career
                  } ${isSelected(CAREER) && styles.isSelected}`}
                >
                  {isSelected(CAREER) ? <HRActiveIcon /> : <HRIcon />}
                  <span>구인 게시판</span>
                </button>
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/${AD}`}>
              <a>
                <button
                  className={`${styles["typo4-medium"]} ${styles.listItem} ${
                    styles.ad
                  } ${isSelected(AD) && styles.isSelected}`}
                >
                  {isSelected(AD) ? <AdActiveIcon /> : <AdIcon />}
                  <span>홍보 게시판</span>
                </button>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
