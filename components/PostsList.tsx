import Link from "next/link";
import { IPostsListPost } from "../types/types";

export const PostsList = ({ posts }: { posts: IPostsListPost[] }) => {
  const postsList = posts.map((post) => (
    <li key={post.id}>
      <Link href={`/posts/${post.boardType.toLowerCase()}/${post.id}`}>
        <a>{post.title}</a>
      </Link>
    </li>
  ));

  return <div>{postsList}</div>;
};
