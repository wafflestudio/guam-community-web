import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store/store";
import { IPostsData } from "../types/types";

interface PostsBoardQuery {
  id: number | undefined;
  page: number | undefined;
}

export const postsListApi = createApi({
  reducerPath: "postsList",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (typeof token === "string") {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Posts List"],
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
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostsByBoardQuery,
  usePostPostMutation,
  util: { getRunningOperationPromises },
} = postsListApi;

export const { getAllPosts, getPostsByBoard, postPost } =
  postsListApi.endpoints;
