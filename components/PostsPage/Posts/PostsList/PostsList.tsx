import { useEffect, useState } from "react";

import { postsApi } from "../../../../store/postsApi";
import { IPostsListPost } from "../../../../types/types";
import useRouterInfo from "../../../../utils/useRouterInfo";
import PaginationButton from "../../PaginationButton/PaginationButton";

import Post from "./Post";

import styles from "./PostsList.module.scss";

export default function PostsList() {
  const [posts, setPosts] = useState<IPostsListPost[]>([]);

  const { boardId, page, keyword } = useRouterInfo();

  const result =
    typeof boardId === "number"
      ? postsApi.endpoints.getPostsByBoard.useQueryState({
          boardId,
          page,
        })
      : typeof keyword === "string"
      ? postsApi.endpoints.getSearchPosts.useQueryState({ keyword, page })
      : postsApi.endpoints.getAllPosts.useQueryState(page);

  useEffect(() => {
    if (result.data) {
      setPosts(result.data?.content);
    }
  }, [result]);

  const postsList = posts.map((post) => <Post key={post.id} post={post} />);

  return (
    <>
      <div className={styles.container}>
        <ul>{result.data ? postsList : null}</ul>
        {result.isLoading ? (
          <img className={styles.loading} src={"/loading.gif"} />
        ) : null}
        {result.data ? <PaginationButton /> : null}
      </div>
    </>
  );
}
