import { useMemo } from "react";

import { IPostsListPost } from "../../../../types/types";
import PaginationButton from "../../PaginationButton/PaginationButton";

import Post from "./Post";

import styles from "./PostsList.module.scss";

export default function PostsList({
  posts,
  isLoading,
}: {
  posts: IPostsListPost[] | undefined;
  isLoading: boolean;
}) {
  const postsList = useMemo(
    () => posts?.map((post) => <Post key={post.id} post={post} />),
    [posts]
  );

  return (
    <>
      <div className={styles.container}>
        <ul>{posts ? postsList : null}</ul>
        {isLoading ? (
          <img className={styles.loading} src={"/loading.gif"} />
        ) : null}
        {posts ? <PaginationButton /> : null}
      </div>
    </>
  );
}
