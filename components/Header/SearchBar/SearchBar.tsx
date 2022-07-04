import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SearchIcon from "../../../assets/icons/search.svg";

import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (router.isReady && typeof router.query.keyword === "string")
      setSearchInput(decodeURI(router.query.keyword));
    else setSearchInput("");
  }, [router.query.keyword]);

  const onSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearchInput(e.target.value);

  const onSearch: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push(`/posts/search?keyword=${searchInput.trim()}`);
  };

  return (
    <form className={styles.container} onSubmit={onSearch}>
      <input
        className={`${styles.searchInput} ${styles["typo4-regular"]}`}
        type="text"
        placeholder="개발자!"
        value={searchInput}
        onChange={onSearchInputChange}
      />
      <button>
        <SearchIcon />
      </button>
    </form>
  );
}
