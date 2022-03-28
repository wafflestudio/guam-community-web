import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { postsListApi } from "../../../../api/postsListApi";
import { boardList } from "../../../../constants/constants";
import { IPostsListPost } from "../../../../types/types";

import Post from "./Post";

import styles from "./PostsList.module.scss";

export default function PostsList() {
  const [posts, setPosts] = useState<IPostsListPost[]>([]);

  const router = useRouter();

  const boardType = useMemo(() => router.query.boardType, [router.query]);
  const boardId = useMemo(
    () => boardList.find((board) => boardType === board.route)?.id,
    [boardType]
  );

  const result =
    typeof boardId === "number"
      ? postsListApi.endpoints.getPostsByBoard.useQueryState(boardId)
      : postsListApi.endpoints.getAllPosts.useQueryState();

  useEffect(() => {
    setPosts(result.data?.content || []);
  }, [result]);

  const postsList = posts.map((post) => <Post key={post.id} post={post} />);

  return <ul className={styles.container}>{postsList}</ul>;
}
