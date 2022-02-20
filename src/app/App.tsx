import React from "react";
import { Navbar } from "../feature/navigation/Navbar";
import styles from "./App.module.scss";
import { useAppSelector } from "./hooks";

const App = () => {
  const username = useAppSelector((state) => state.user.name);
  return (
    <div className={styles.App}>
      <Navbar />
      <div>Hello {username}!</div>
    </div>
  );
};

export default App;
