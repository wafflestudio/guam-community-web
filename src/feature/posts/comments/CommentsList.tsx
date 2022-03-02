import React from "react";
import { IComment } from "../../../types/types";

export const CommentsList = ({
  comments,
}: {
  comments: IComment[] | undefined;
}) => {
  return (
    <div>
      {comments?.map((comment: IComment) => (
        <li key={comment.id}>
          <span>{comment.user.nickname}</span> <span>{comment.content}</span>
        </li>
      ))}
    </div>
  );
};
