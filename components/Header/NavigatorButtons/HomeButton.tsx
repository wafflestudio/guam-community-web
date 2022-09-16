import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import HomeIcon from "assets/icons/home/filled.svg";
import styles from "styles/Navigator.module.scss";

export default function HomeButton() {
  const router = useRouter();

  return (
    <li className={styles.homeButton}>
      <Link href={"/"}>
        <a>
          <button className={`${router.pathname === "/" && styles.isAtHome}`}>
            <HomeIcon />
            <div className={styles["typo1-medium"]}>홈</div>
          </button>
        </a>
      </Link>
    </li>
  );
}
