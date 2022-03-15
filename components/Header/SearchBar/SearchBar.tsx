import styles from "./SearchBar.module.scss";
import SearchIcon from "../../../assets/icons/search.svg";
import { useState } from "react";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const onSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearchInput(e.target.value);

  return (
    <form className={styles.container}>
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