import styles from "styles/Side.module.scss";

import Profile from "../Profile";

import PostsBoard from "./PostsBoard";

export default function Side() {
  return (
    <div className={styles.container}>
      <Profile />
      <PostsBoard />
    </div>
  );
}
