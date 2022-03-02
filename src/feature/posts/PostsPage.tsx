import React from "react";
import { Navbar } from "../../common/Navbar";
import { PostsList } from "./PostsList";

export const PostsPage = () => {
  return (
    <>
      <Navbar />
      <PostsList />
    </>
  );
};
