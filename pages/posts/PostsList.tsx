import { IPostsListPost } from "../../types/types";

export const PostsList = ({ posts }: { posts: IPostsListPost[] }) => {
  const postsList = posts.map((post) => <li key={post.id}>{post.title}</li>);

  return <div>{postsList}</div>;
};
