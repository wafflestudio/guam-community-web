import { useState } from "react";
import { api } from "../api/api";
import { setComments } from "../store/commentsSlice";
import { useAppDispatch } from "../store/hooks";

export default function CommentForm({ id }: { id: number }) {
  const [commentInput, setCommentInput] = useState("");

  const dispatch = useAppDispatch();

  const onCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setCommentInput(e.target.value);

  const onSubmitComment: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/posts/${id}/comments`, {
        content: commentInput,
        mentionIds: [0],
      });
      setCommentInput("");
      const { data } = await api.get(`/posts/${id}/comments`);
      dispatch(setComments(data.content));
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
          value={commentInput}
          onChange={onCommentChange}
        />
      </label>
      <button type="submit">댓글 작성하기</button>
    </form>
  );
}
