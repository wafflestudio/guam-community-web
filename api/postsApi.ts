import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IDetailedPost,
  ILetters,
  IPairLetters,
  IPostsData,
} from "../types/types";
import { getFirebaseIdToken } from "../utils/firebaseUtils";

interface PostsBoardQuery {
  boardId?: number | undefined;
  keyword?: string;
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
  tagTypes: ["Posts List", "Post Detail", "LetterBox List", "Letters"],
  endpoints: (build) => ({
    getAllPosts: build.query<IPostsData, number | void>({
      query: (page) => ({ url: `posts?page=${page}` }),
      providesTags: () => [{ type: "Posts List", boardId: 0 }],
    }),
    getPostsByBoard: build.query<IPostsData, PostsBoardQuery>({
      query: (req) => ({
        url: `posts?boardId=${req.boardId}&page=${req.page}`,
      }),
      providesTags: (result, error, req) => [
        {
          type: "Posts List",
          boardId: req.boardId,
        },
      ],
    }),
    getSearchPosts: build.query<IPostsData, PostsBoardQuery>({
      query: (req) => ({
        url: `posts/search?keyword=${req.keyword}&page=${req.page}`,
      }),
      providesTags: (result, error, req) => [
        {
          type: "Posts List",
          search: req.keyword,
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
    scrapPost: build.mutation({
      query(req) {
        return {
          url: `posts/${req.postId}/scraps`,
          method: !req.scrapped ? "POST" : "DELETE",
        };
      },
      invalidatesTags: (result, error, req) => [
        { type: "Posts List", boardId: 0 },
        { type: "Posts List", boardId: req.boardId },
      ],
    }),
    likePost: build.mutation({
      query(req) {
        return {
          url: `posts/${req.postId}/likes`,
          method: !req.liked ? "POST" : "DELETE",
        };
      },
      invalidatesTags: (result, error, req) => [
        { type: "Posts List", boardId: 0 },
        { type: "Posts List", boardId: req.boardId },
      ],
    }),

    getPostDetail: build.query<IDetailedPost, number>({
      query: (postId: number) => ({
        url: `posts/${postId}`,
      }),
      providesTags: (result) => [{ type: "Post Detail", postId: result?.id }],
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
        { type: "Posts List", boardId: result.boardId },
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
      invalidatesTags: (result) => [
        { type: "Post Detail", postId: result.postId },
      ],
    }),
    deleteComment: build.mutation({
      query(body) {
        return {
          url: `posts/${body.postId}/comments/${body.commentId}`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: (result) => [
        { type: "Post Detail", postId: result.postId },
      ],
    }),
    likeComment: build.mutation({
      query(req) {
        return {
          url: `posts/${req.postId}/comments/${req.commentId}/likes`,
          method: !req.liked ? "POST" : "DELETE",
        };
      },
      invalidatesTags: (result) => [
        { type: "Post Detail", postId: result.postId },
      ],
    }),

    getLetters: build.query<ILetters, void>({
      query: () => ({ url: `letters`, method: "GET" }),
      providesTags: () => [{ type: "LetterBox List" }],
    }),
    getPairLetters: build.query<IPairLetters, number>({
      query: (id) => ({ url: `letters/${id}`, method: "GET" }),
      providesTags: (result) => [{ type: "Letters", pairId: result?.pairId }],
    }),
    postLetter: build.mutation({
      query: (data: FormData) => ({
        url: `letters`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => [
        { type: "Letters", pairId: result?.to },
        { type: "LetterBox List" },
      ],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostsByBoardQuery,
  useGetSearchPostsQuery,
  usePostPostMutation,
  useScrapPostMutation,
  useLikePostMutation,
  useGetPostDetailQuery,
  useDeletePostMutation,
  usePostCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useGetLettersQuery,
  useGetPairLettersQuery,
  usePostLetterMutation,
  util: { getRunningOperationPromises },
} = postsApi;

export const { getAllPosts, getPostsByBoard, getSearchPosts, postPost } =
  postsApi.endpoints;
