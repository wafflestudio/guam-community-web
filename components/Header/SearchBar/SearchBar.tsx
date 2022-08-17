import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SearchIcon from "../../../assets/icons/search.svg";
import { useAppDispatch } from "../../../store/hooks";
import { setToast } from "../../../store/toastSlice";
import useRouterInfo from "../../../utils/useRouterInfo";

import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { keyword } = useRouterInfo();

  useEffect(() => {
    setSearchInput(decodeURI(keyword));
  }, [keyword]);

  const onSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setSearchInput(target.value);

  const onSearch: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (searchInput.length < 2)
      return dispatch(setToast("검색은 두 글자 이상"));
    router.push(`/search?keyword=${searchInput.trim()}`);
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
