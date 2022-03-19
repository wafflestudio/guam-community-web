import Navigator from "./Navigator/Navigator";
import SearchBar from "./SearchBar/SearchBar";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.main}>
        <div className={styles.logo} />
        <SearchBar />
        <Navigator />
      </div>
    </header>
  );
}
