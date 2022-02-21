import React from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { LogInOut } from "../common/LogInOut";
import { PostsList } from "../feature/posts/PostsList";
import styles from "./App.module.scss";
import { useAppSelector } from "./hooks";

const App = () => {
  const username = useAppSelector((state) => state.user.name);

  const { pathname } = useLocation();

  return (
    <>
      <LogInOut />
      {pathname === "/" ? (
        <Link to="/posts">글 보기</Link>
      ) : (
        <Link to="/">돌아가기</Link>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.userGreetings}>Hello {username}!</div>
          }
        />
        <Route path="/posts" element={<PostsList />} />
      </Routes>
    </>
  );
};

export default App;
