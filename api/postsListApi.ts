import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { RootState } from "../store/store";
import { IPostsData } from "../types/types";

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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Posts List"],
  endpoints: (build) => ({
    getAllPosts: build.query<IPostsData, void>({
      query: () => ({ url: `posts` }),
      providesTags: () => [{ type: "Posts List", id: 0 }],
    }),
    getPostsByBoard: build.query<IPostsData, number>({
      query: (id: number) => ({ url: `posts?boardId=${id}` }),
      providesTags: (result) => [
        {
          type: "Posts List",
          id: result?.content[0].boardId,
        },
      ],
    }),
    postPost: build.mutation({
      query(body) {
        return {
          url: `posts`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result) => [
        { type: "Posts List", id: result.boardId },
        { type: "Posts List", id: 0 },
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
