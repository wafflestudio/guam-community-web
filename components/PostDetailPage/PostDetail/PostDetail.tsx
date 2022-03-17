import PostWriteButton from "../../PostsPage/Posts/WriteAPost/PostWriteButton/PostWriteButton";
import BoardName from "./BoardName";
import CommentForm from "./Comments/CommentForm";
import CommentsList from "./Comments/CommentsList";
import PostMain from "./PostMain";

export default function PostDetail() {
  return (
    <>
      <BoardName />
      <PostWriteButton postDetailPage />
      <PostMain />
      <CommentsList />
      <CommentForm />
    </>
  );
}
