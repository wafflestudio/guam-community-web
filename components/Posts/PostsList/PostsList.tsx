import { IPostsListPost } from "../../../types/types";
import Post from "./Post";
import styles from "./PostsList.module.scss";

export default function PostsList({ posts }: { posts: IPostsListPost[] }) {
  const postsList = posts.map((post) => <Post key={post.id} post={post} />);
  return <ul className={styles.container}>{postsList}</ul>;
}
