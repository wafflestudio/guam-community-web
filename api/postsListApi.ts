import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store/store";
import { IPostsData } from "../types/types";

interface PostsBoardQuery {
  id: number;
  page: number;
}

export const postsListApi = createApi({
  reducerPath: "postsList",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers, { getState }) => {
      const { token, isLoggedIn } = (getState() as RootState).auth;
      if (isLoggedIn) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Posts List"],
  endpoints: (build) => ({
    getAllPosts: build.query<IPostsData, number | void>({
      query: (page = 0) => ({ url: `posts?page=${page}` }),
      providesTags: () => [{ type: "Posts List", id: 0 }],
    }),
    getPostsByBoard: build.query<IPostsData, PostsBoardQuery>({
      query: (req) => ({
        url: `posts?boardId=${req.id}&page=${req.page}`,
      }),
      providesTags: (result) => [
        {
          type: "Posts List",
          id: result?.content[0]?.boardId,
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
        { type: "Posts List", id: 0 },
        { type: "Posts List", id: result.boardId },
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
