import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { login, logout } from "../user/userSlice";

export const Navbar = () => {
  const [loginForm, setLoginForm] = useState(false); // 로그인 폼 표시 여부
  const [username, setUsername] = useState("");

  const dispatch = useAppDispatch();

  const { isLoggedIn } = useAppSelector((state) => state.user);

  const toggleLogInOut: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // 로그인/로그아웃 기능
    e.preventDefault();
    if (isLoggedIn) {
      setUsername("");
      dispatch(logout());
    } else {
      setLoginForm(true);
    }
  };
  const onSubmitUsername: React.FormEventHandler<HTMLFormElement> = (e) => {
    // 유저 이름 submit
    e.preventDefault();
    dispatch(login(username));
    setLoginForm(false);
  };
  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    // 유저 이름 input onChange
    setUsername(e.target.value);

  return (
    <nav>
      <ul>
        <li>피드</li>
        <li>익명</li>
        <li>자유</li>
        <li>구인</li>
        <li>정보공유</li>
      </ul>
      <button type="button" onClick={toggleLogInOut}>
        {isLoggedIn ? "로그아웃" : "로그인"}
      </button>
      {loginForm ? (
        <form onSubmit={onSubmitUsername}>
          <label htmlFor="username">
            이름
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onUsernameChange}
            />
          </label>
          <button type="submit">로그인</button>
        </form>
      ) : null}
    </nav>
  );
};
