import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IDetailedPost, IPostsData } from "../types/types";
import { getFirebaseIdToken } from "../utils/firebaseUtils";

interface PostsBoardQuery {
  id: number | undefined;
  page: number | undefined;
}

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: async (headers) => {
      const token = await getFirebaseIdToken();
      if (typeof token === "string") {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Posts List", "Post Detail"],
  endpoints: (build) => ({
    getAllPosts: build.query<IPostsData, number | void>({
      query: (page) => ({ url: `posts?page=${page}` }),
      providesTags: () => [{ type: "Posts List", boardId: 0 }],
    }),
    getPostsByBoard: build.query<IPostsData, PostsBoardQuery>({
      query: (req) => ({
        url: `posts?boardId=${req.id}&page=${req.page}`,
      }),
      providesTags: (result, error, req) => [
        {
          type: "Posts List",
          boardId: req.id,
        },
      ],
    }),
    postPost: build.mutation({
      query: (body) => {
        return {
          url: `posts`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result) => [
        { type: "Posts List", boardId: 0 },
        { type: "Posts List", boardId: result.boardId },
      ],
    }),

    getPostDetail: build.query<IDetailedPost, string>({
      query: (postId: string) => ({
        url: `posts/${postId}`,
      }),
      providesTags: (result) => [{ type: "Post Detail", id: result?.id }],
    }),
    deletePost: build.mutation({
      query(postId) {
        return {
          url: `posts/${postId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result) => [
        { type: "Posts List", boardId: 0 },
        { type: "Posts List", id: result.boardId },
      ],
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

export const {
  useGetAllPostsQuery,
  useGetPostsByBoardQuery,
  usePostPostMutation,
  useGetPostDetailQuery,
  useDeletePostMutation,
  usePostCommentMutation,
  useDeleteCommentMutation,
  util: { getRunningOperationPromises },
} = postsApi;

export const { getAllPosts, getPostsByBoard, postPost } = postsApi.endpoints;
