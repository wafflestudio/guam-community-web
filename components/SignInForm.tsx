import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { setToken } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onSignIn: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const config: AxiosRequestConfig = {
      method: "post",
      baseURL: "https://www.googleapis.com/identitytoolkit/v3",
      url: "/relyingparty/verifyPassword",
      params: {
        key: process.env.KEY,
      },
      data: {
        email,
        password,
        returnSecureToken: true,
      },
    };

    try {
      const { data } = await axios(config);
      dispatch(setToken(data.idToken));
    } catch (error) {
      console.log(error);
      window.alert("로그인 에러");
    }
  };

  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setEmail(e.target.value);
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    // 유저 이름 input onChange
    setPassword(e.target.value);

  return (
    <>
      {isLoggedIn ? null : (
        <>
          <div>로그인해주세요</div>
          <form onSubmit={onSignIn}>
            <label htmlFor="email">
              아이디
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={onUsernameChange}
              />
            </label>
            <label htmlFor="password">
              비밀번호
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onPasswordChange}
              />
            </label>
            <button type="submit">로그인</button>
          </form>
        </>
      )}
    </>
  );
}
