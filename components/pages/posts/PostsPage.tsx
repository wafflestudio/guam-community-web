import Side from "components/Side/Side";
import styles from "styles/PostsPage.module.scss";
import { IPostsListPost } from "types/types";

import PostsList from "./PostsList/PostsList";
import WriteAPost from "./WriteAPost/WriteAPost";

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
