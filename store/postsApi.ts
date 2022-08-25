import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { HYDRATE } from "next-redux-wrapper";

import {
  IDetailedPost,
  ILetters,
  IPairLetters,
  IPostsData,
  IPushData,
  IUser,
} from "../types/types";
import { getFirebaseIdToken } from "../utils/firebaseUtils";

interface PostsBoardQuery {
  boardId?: number | undefined;
  keyword?: string;
  page: number | undefined;
}

interface PostsFavoriteQuery {
  boardId?: number;
  rankFrom?: number;
}

interface PostPostQuery {
  boardId: number;
  categoryId: number;
  content: string;
  title: string;
  imageFilePaths?: string[];
}

interface IPostComment {
  content: string;
  mentionIds?: (number | null | undefined)[];
  imageFilePaths: string[];
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
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
  tagTypes: [
    "Posts List",
    "Post Detail",
    "LetterBox List",
    "Letters Count",
    "Letters",
    "Push List",
    "User",
  ],
  endpoints: (build) => ({
    getAllPosts: build.query<IPostsData, number>({
      query: (page) => ({ url: `posts?page=${page}` }),
      providesTags: (result, error, req) => [
        { type: "Posts List", boardId: 0, page: req },
      ],
    }),
    getPostsByBoard: build.query<IPostsData, PostsBoardQuery>({
      query: (req) => ({
        url: `posts?boardId=${req.boardId}&page=${req.page}`,
      }),
      providesTags: (result, error, req) => [
        {
          type: "Posts List",
          boardId: req.boardId,
          page: req,
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
    getFavoritePosts: build.query<IPostsData, PostsFavoriteQuery>({
      query: (req) => ({
        url: `posts/favorites?${
          req.boardId ? `boardId=${req.boardId}` : ""
        }&rankFrom=${req.rankFrom}`,
      }),
      providesTags: (result, error, req) => [
        {
          type: "Posts List",
          rank: req.rankFrom,
        },
      ],
    }),
    getSearchCount: build.query<number, PostsBoardQuery>({
      query: (req) => ({
        url: `posts/search/count?keyword=${req.keyword}`,
      }),
      providesTags: (result, error, req) => [
        {
          type: "Posts List",
          searchCount: req.keyword,
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
        { type: "Posts List", boardId: 0, page: 0 },
        { type: "Posts List", boardId: result.boardId, page: 0 },
      ],
    }),
    patchPost: build.mutation({
      query: (body) => {
        return {
          url: `posts/${body.postId}`,
          method: "PATCH",
          body: body.data,
        };
      },
      invalidatesTags: (result, error, req) => [
        { type: "Posts List", boardId: req.boardId, page: 0 },
        { type: "Posts List", boardId: 0 },
        { type: "Post Detail", postId: result.boardId },
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
      query({ data, id }: { data: IPostComment; id: number }) {
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
    getLettersCount: build.query({
      query: () => ({ url: "letters/me" }),
      providesTags: [{ type: "Letters Count" }],
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
    deleteLetterBox: build.mutation({
      query: (pairId: number) => ({
        url: `letters/${pairId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "LetterBox List" }],
    }),
    getPushList: build.query<IPushData, number>({
      query: (page) => ({
        url: `push?page=${page}&size=10`,
        method: "GET",
      }),
      keepUnusedDataFor: Infinity,
      providesTags: () => [{ type: "Push List" }],
    }),
    postPushRead: build.mutation({
      query: ({ userId, pushEventIds }) => ({
        url: `push/read`,
        method: "POST",
        body: { userId, pushEventIds },
      }),
      invalidatesTags: () => [{ type: "Push List" }],
    }),

    getUser: build.query<IUser, number>({
      query: (id) => ({ url: `users/${id}`, method: "GET" }),
      providesTags: (result) => [{ type: "User", userId: result?.id }],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostsByBoardQuery,
  useGetSearchPostsQuery,
  useGetFavoritePostsQuery,
  useGetSearchCountQuery,
  usePostPostMutation,
  usePatchPostMutation,
  useScrapPostMutation,
  useLikePostMutation,
  useGetPostDetailQuery,
  useDeletePostMutation,
  usePostCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useGetLettersQuery,
  useGetPairLettersQuery,
  useGetLettersCountQuery,
  usePostLetterMutation,
  useDeleteLetterBoxMutation,
  useGetPushListQuery,
  usePostPushReadMutation,
  useGetUserQuery,
  util: { getRunningOperationPromises },
} = postsApi;

export const { getAllPosts, getPostsByBoard, getSearchPosts, postPost } =
  postsApi.endpoints;
