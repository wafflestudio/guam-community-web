import { useState } from "react";
import { api } from "../api/api";

export default function CommentForm({ id }: { id: number }) {
  const [comment, setComment] = useState("");

  const onCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setComment(e.target.value);

  const onSubmitComment: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/posts/${id}/comments`, {
        content: comment,
        mentionIds: [0],
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={onSubmitComment}>
      <label htmlFor="comment">
        댓글
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={onCommentChange}
        />
      </label>
      <button type="submit">댓글 작성하기</button>
    </form>
  );
}
