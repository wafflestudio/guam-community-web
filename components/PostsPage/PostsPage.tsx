import styles from "./PostsPage.module.scss";
import Posts from "./Posts/Posts";
import Side from "../PostPageSide/Side";

export default function PostsPage() {
  return (
    <div className={styles.container}>
      <Side />
      <Posts />
    </div>
  );
}
