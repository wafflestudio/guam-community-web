import { useEffect, useMemo } from "react";

import PaginationButton from "components/Buttons/PaginationButton";
import { useAppDispatch } from "store/hooks";
import { setToast } from "store/toastSlice";
import styles from "styles/PostsPage.module.scss";
import { IPostsListPost } from "types/types";

import Post from "./Post";

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
      <div className={styles.listContainer}>
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
