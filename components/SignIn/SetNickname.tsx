import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEventHandler, useState } from "react";

import BalloonIcon from "../../assets/icons/balloon/balloon_32.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserState } from "../../store/userSlice";
import { getFirebaseIdToken } from "../../utils/firebaseUtils";

import LeftGuam from "./LeftGuam";

import styles from "./SignIn.module.scss";

export default function SetNickname() {
  const [nickname, setNickname] = useState("");

  const { id } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onNicknameChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setNickname(target.value);

  const onSubmitNickname = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);

    try {
      const token = await getFirebaseIdToken();
      const { data } = await axios.patch(`/api/users/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      data.profileSet = true;
      dispatch(setUserState(data));

      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <LeftGuam />
        <div className={styles.setNickname}>
          <BalloonIcon />
          <div className={`${styles["typo8-medium"]} ${styles.greetings}`}>
            IT인들의 괌에
            <br /> 오신 것을 환영합니다!
          </div>
          <div className={`${styles["typo6-regular"]} ${styles.instructions}`}>
            사용하실 닉네임을
            <br />
            10자 이내로 입력해주세요.
          </div>
          <input
            className={styles["typo5-regular"]}
            type={"text"}
            placeholder={"ex) 크로플보다와플"}
            value={nickname}
            onChange={onNicknameChange}
          />
          <button
            className={`${styles["typo5-regular"]} ${styles.submit}`}
            onClick={onSubmitNickname}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
