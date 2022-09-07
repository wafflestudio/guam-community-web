import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useAppDispatch } from "store/hooks";
import { resetModals } from "store/modalSlice";

import Navigator from "./Navigator/Navigator";
import SearchBar from "./SearchBar/SearchBar";

import styles from "./Header.module.scss";

export default function Header() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetModals());
  }, [router.asPath]);

  return (
    <header className={styles.container}>
      <div className={styles.main}>
        <Link href={"/"}>
          <a>
            <div className={styles.logo} />
          </a>
        </Link>
        <SearchBar />
        <Navigator />
      </div>
    </header>
  );
}
