import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { login, logout } from "../feature/user/userSlice";

export const LogInOut = () => {
  const [loginForm, setLoginForm] = useState(false); // 로그인 폼 표시 여부
  const [username, setUsername] = useState("");

  const dispatch = useAppDispatch();

  const { isLoggedIn } = useAppSelector((state) => state.user);

  const toggleLogInOut: React.MouseEventHandler<HTMLButtonElement> = () => {
    // 로그인/로그아웃 기능
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
    if (username.length === 0) {
      window.alert("이름을 입력해주세요"); // 나중에 커스텀 토스트?
      return;
    }
    dispatch(login(username));
    setLoginForm(false);
  };
  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    // 유저 이름 input onChange
    setUsername(e.target.value);
  const onCancelSubmit = () => setLoginForm(false);

  return (
    <>
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
          <button type="button" onClick={onCancelSubmit}>
            취소
          </button>
        </form>
      ) : null}
    </>
  );
};
