import PostsBoard from "./PostsBoard";
import Profile from "./Profile";

import styles from "./Side.module.scss";

export default function Side() {
  return (
    <div className={styles.container}>
      <Profile />
      <PostsBoard />
    </div>
  );
}
