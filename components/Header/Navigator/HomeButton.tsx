import { useRouter } from "next/router";
import React from "react";
import HomeIcon from "../../../assets/icons/home/filled.svg";
import styles from "./HomeButton.module.scss";

export default function HomeButton() {
  const router = useRouter();

  const onHomeClick: React.MouseEventHandler = () => router.push("/");

  return (
    <li className={styles.homeButton} onClick={onHomeClick}>
      <button>
        <HomeIcon />
        <div className={styles["typo1-medium"]}>홈</div>
      </button>
    </li>
  );
}
