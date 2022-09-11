import PostWriteButton from "components/Buttons/PostWriteButton";

import CommentForm from "../Comments/CommentForm/CommentForm";
import CommentsList from "../Comments/CommentsList";

import BoardName from "./BoardName";
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
