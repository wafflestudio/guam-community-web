import PostWriteButton from "components/Buttons/PostWriteButton/PostWriteButton";

import BoardName from "./BoardName";
import CommentForm from "./Comments/CommentForm/CommentForm";
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
