import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUserState } from "../store/userSlice";

export default function SetProfile() {
  const [nickname, setNickname] = useState("");

  const { id } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onNicknameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setNickname(target.value);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const object = {
      nickname,
    };
    Object.keys(object).forEach((key) =>
      formData.append(key, object[key as keyof object])
    );

    try {
      const { data } = await axios.patch(`/api/users/${id}`, formData);
      data.profileSet = true;
      dispatch(setUserState(data));

      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="nickname">
        닉네임
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={onNicknameChange}
        />
      </label>
      <button type="submit">등록</button>
    </form>
  );
}
