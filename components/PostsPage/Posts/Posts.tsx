import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { api } from "../../../api/api";
import { boardList, ERROR, LOADING } from "../../../constants/constants";
import { useAppSelector } from "../../../store/hooks";
import { IPostsData } from "../../../types/types";
import styles from "./Posts.module.scss";
import PostsList from "./PostsList/PostsList";
import WriteAPost from "./WriteAPost/WriteAPost";

export default function Posts() {
  return (
    <div className={styles.container}>
      <WriteAPost />
      <PostsList />
    </div>
  );
}
