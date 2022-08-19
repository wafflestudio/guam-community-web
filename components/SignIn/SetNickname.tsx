import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEventHandler, useState } from "react";

import BalloonIcon from "../../assets/icons/balloon/balloon_32.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserState } from "../../store/userSlice";
import { getFirebaseIdToken } from "../../utils/firebaseUtils";

import styles from "./SignIn.module.scss";

export default function SetNickname() {
  const [nickname, setNickname] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const [duplicateNickname, setDuplicateNickname] = useState("");

  const { id } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onNicknameChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setNickname(target.value);

  const onSubmitNickname = async () => {
    if (nickname.length < 2) return alert("닉네임 두글자 이상");

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
    <div className={styles.setNicknameContainer}>
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
        <div className={styles.nicknameInput}>
          <input
            className={`${styles["typo5-regular"]} ${
              nickname.length && styles.filled
            } ${duplicate && styles.duplicate}`}
            type={"text"}
            placeholder={"ex) 크로플보다와플"}
            value={nickname}
            onChange={onNicknameChange}
          />
          {duplicate && duplicateNickname === nickname ? (
            <div className={styles["typo4-regular"]}>
              이미 사용중인 닉네임입니다.
            </div>
          ) : null}
        </div>
        <button
          className={`${styles["typo5-regular"]} ${styles.submit}`}
          onClick={onSubmitNickname}
          disabled={
            nickname.length < 2 || (duplicate && duplicateNickname === nickname)
          }
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
