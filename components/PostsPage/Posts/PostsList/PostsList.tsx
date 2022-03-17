import { useAppSelector } from "../../../../store/hooks";
import Post from "./Post";
import styles from "./PostsList.module.scss";

export default function PostsList() {
  const posts = useAppSelector((state) => state.postsList.posts);

  const postsList = posts?.map((post) => <Post key={post.id} post={post} />);

  return <ul className={styles.container}>{postsList}</ul>;
}
