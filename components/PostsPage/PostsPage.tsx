import { IPostsListPost } from "../../types/types";
import Side from "../Side/Side";

import PostsList from "./Posts/PostsList/PostsList";
import WriteAPost from "./Posts/WriteAPost/WriteAPost";

import styles from "./PostsPage.module.scss";

export default function PostsPage({
  posts,
  isLoading,
  hasNext,
}: {
  posts: IPostsListPost[] | undefined;
  isLoading: boolean;
  hasNext: boolean;
}) {
  return (
    <div className={styles.container}>
      <Side />
      <WriteAPost />
      <PostsList posts={posts} isLoading={isLoading} hasNext={hasNext} />
    </div>
  );
}
