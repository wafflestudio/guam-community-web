import React, { useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios, { AxiosRequestConfig } from "axios";
import styles from "./App.module.scss";
import { useAppDispatch } from "../store/hooks";
import { removeToken, setToken } from "../store/authSlice";
import { PostsPage } from "../feature/posts/PostsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  axios.defaults.baseURL = "https://guam.jon-snow-korea.com/community/api/v1";
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const config: AxiosRequestConfig = {
        method: "post",
        baseURL: "https://www.googleapis.com/identitytoolkit/v3",
        url: "/relyingparty/verifyPassword",
        params: {
          key: "AIzaSyAYoZLtqIgtE8eLeyNgCoLYIa3f3UYmXDs",
        },
        data: {
          email: "guam2@guam.guam",
          password: "wafflestudio",
          returnSecureToken: true,
        },
      };

      try {
        const { data } = await axios(config);
        dispatch(setToken(data.idToken));
      } catch (error) {
        console.log(error);
      }
    };
    const init = async () => {
      // (자동로그인) 저장되어있는 토큰이 유효한지 확인
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        dispatch(removeToken());
        fetchToken();
        return;
      }

      try {
        // 만약 추후 토큰이 유효한지 확인할 수 있는 api가 생긴다면 그쪽으로 api 날려서 확인
        await axios.get("/posts", {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });
        dispatch(setToken(savedToken));
      } catch (error) {
        console.log("error:", error);
        dispatch(removeToken());
        fetchToken();
      }
    };
    init();
  }, []);

  const { pathname } = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      {pathname === "/" ? (
        <Link to="/posts/all">글 보기</Link>
      ) : (
        <Link to="/">돌아가기</Link>
      )}
      <Routes>
        <Route
          path="/"
          element={<div className={styles.userGreetings}>Hello!</div>}
        />
        <Route path="/posts/:boardType" element={<PostsPage />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
