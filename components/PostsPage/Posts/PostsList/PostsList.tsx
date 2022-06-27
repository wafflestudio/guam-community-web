import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { postsApi } from "../../../../api/postsApi";
import { boardList } from "../../../../constants/constants";
import { IPostsListPost } from "../../../../types/types";

import Post from "./Post";

import styles from "./PostsList.module.scss";

export default function PostsList() {
  const [posts, setPosts] = useState<IPostsListPost[]>([]);

  const router = useRouter();

  const boardType = useMemo(() => router.query.boardType, [router.query]);
  const keyword = useMemo(
    () =>
      typeof router.query.keyword === "string" &&
      encodeURI(router.query.keyword),
    [router.query]
  );

  const page = useMemo(
    () =>
      typeof router.query.page === "string"
        ? parseInt(router.query.page) - 1
        : 0,
    [router.query]
  );
  const boardId = useMemo(
    () => boardList.find((board) => boardType === board.route)?.id,
    [boardType]
  );

  const result =
    typeof boardId === "number"
      ? postsApi.endpoints.getPostsByBoard.useQueryState({
          id: boardId,
          page,
        })
      : typeof keyword === "string"
      ? postsApi.endpoints.getSearchPosts.useQuery({ keyword, page })
      : postsApi.endpoints.getAllPosts.useQueryState(page);

  useEffect(() => {
    setPosts(result.data?.content || []);
  }, [result]);

  const postsList = useMemo(
    () => posts.map((post) => <Post key={post.id} post={post} />),
    [posts]
  );

  return (
    <ul className={styles.container}>
      {postsList}
      {result.isLoading ? (
        <img className={styles.loading} src={"/loading.gif"} />
      ) : null}
    </ul>
  );
}
