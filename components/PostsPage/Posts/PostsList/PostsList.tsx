import { useEffect, useMemo } from "react";

import { useAppDispatch } from "../../../../store/hooks";
import { setToast } from "../../../../store/toastSlice";
import { IPostsListPost } from "../../../../types/types";
import PaginationButton from "../../PaginationButton/PaginationButton";

import Post from "./Post";

import styles from "./PostsList.module.scss";

export default function PostsList({
  posts,
  isLoading,
  hasNext,
}: {
  posts: IPostsListPost[] | undefined;
  isLoading: boolean;
  hasNext: boolean;
}) {
  const dispatch = useAppDispatch();

  const postsList = useMemo(
    () => posts?.map((post) => <Post key={post.id} post={post} />),
    [posts]
  );

  useEffect(() => {
    if (posts?.length === 0) {
      dispatch(setToast("게시글이 더이상 없습니다."));
    }
  }, [dispatch, posts?.length]);

  return (
    <>
      <div className={styles.container}>
        <ul>{posts ? postsList : null}</ul>
        {isLoading ? (
          <img className={styles.loading} src={"/loading.gif"} />
        ) : null}
        {posts ? (
          <PaginationButton hasNext={!(posts?.length === 0) && hasNext} />
        ) : null}
      </div>
    </>
  );
}
