import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { RootState } from "../store/store";
import { IDetailedPost } from "../types/types";

export const postDetailApi = createApi({
  reducerPath: "postDetail",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Post Detail"],
  endpoints: (build) => ({
    getPostDetail: build.query<IDetailedPost, string>({
      query: (postId: string) => ({
        url: `posts/${postId}`,
      }),
      providesTags: (result) => [{ type: "Post Detail", id: result?.id }],
    }),
    postComment: build.mutation({
      query({ data, id }: { data: FormData; id: string }) {
        return {
          url: `posts/${id}/comments`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result) => [{ type: "Post Detail", id: result.postId }],
    }),
    deleteComment: build.mutation({
      query(body) {
        return {
          url: `posts/${body.postId}/comments/${body.commentId}`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: (result) => [{ type: "Post Detail", id: result.postId }],
    }),
  }),
});

export const { getPostDetail, postComment, deleteComment } =
  postDetailApi.endpoints;

export const {
  useGetPostDetailQuery,
  usePostCommentMutation,
  useDeleteCommentMutation,
  util: { getRunningOperationPromises },
} = postDetailApi;
