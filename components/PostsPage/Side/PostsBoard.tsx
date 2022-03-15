import styles from "./PostsBoard.module.scss";
import GlobalIcon from "../../../assets/icons/board/global.svg";
import FreeIcon from "../../../assets/icons/board/free.svg";
import AnonymousIcon from "../../../assets/icons/board/anonymous.svg";
import BalloonIcon from "../../../assets/icons/board/balloon.svg";
import CareerIcon from "../../../assets/icons/board/career.svg";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PostsBoard() {
  const router = useRouter();

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
                  <GlobalIcon />
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
                  } ${router.query.boardType === "free" && styles.isSelected}`}
                >
                  <FreeIcon />
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
                  } ${
                    router.query.boardType === "anonymous" && styles.isSelected
                  }`}
                >
                  <AnonymousIcon />
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
                  } ${
                    router.query.boardType === "information" &&
                    styles.isSelected
                  }`}
                >
                  <BalloonIcon />
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
                  } ${
                    router.query.boardType === "career" && styles.isSelected
                  }`}
                >
                  <CareerIcon />
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
