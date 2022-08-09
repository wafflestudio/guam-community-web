import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import axios from "axios";

import PostFormModal from "../components/Modals/PostFormModal/PostFormModal";
import PageTitle from "../components/PageTitle";
import Side from "../components/PostPageSide/Side";
import PaginationButton from "../components/PostsPage/PaginationButton/PaginationButton";
import Post from "../components/PostsPage/Posts/PostsList/Post";
import WriteAPost from "../components/PostsPage/Posts/WriteAPost/WriteAPost";
import styles from "../components/PostsPage/PostsPage.module.scss";
import { useAppSelector } from "../store/hooks";
import { useGetAllPostsQuery } from "../store/postsApi";
import { IPostsListPost } from "../types/types";

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { data: clientPosts, isLoading } = useGetAllPostsQuery(props.page, {
    skip: !isLoggedIn,
  });

  return (
    <>
      <PageTitle title="Home" />
      <div className={styles.container}>
        <Side />
        <WriteAPost />
        <div className={styles.listContainer}>
          <ul>
            {clientPosts
              ? clientPosts.content.map((post: IPostsListPost) => (
                  <Post key={post.id} post={post} />
                ))
              : props.data
              ? props.data.content.map((post: IPostsListPost) => (
                  <Post key={post.id} post={post} />
                ))
              : null}
          </ul>
          {isLoading ? (
            <img
              className={styles.loading}
              src={"/loading.gif"}
              alt={"loading..."}
            />
          ) : null}
          {props.data ? <PaginationButton /> : null}
        </div>
        <PostFormModal />
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { page } = context.query;
  const parsedPage =
    typeof page === "string" && typeof parseInt(page) === "number"
      ? parseInt(page) - 1
      : 0;

  const { data } = await axios.get(
    `${process.env.POSTS_URL}${parsedPage}&size=10`
  );

  return {
    props: { page: parsedPage, data },
  };
};
