import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import TagInput from "components/pages/ProfileSetting/TagInput/TagInput";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setUserState } from "store/userSlice";
import styles from "styles/ProfileSettingPage.module.scss";
import { getFirebaseIdToken } from "utils/firebaseUtils";

export default function SettingPage() {
  const [nickname, setNickname] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [githubId, setGithubId] = useState<string>("");
  const [blogUrl, setBlogUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>(
    "/default_profile_image.png"
  );
  const [submittedImage, setSubmittedImage] = useState<File | Blob | null>(
    null
  );

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.profileSet) {
      setNickname(user.nickname || "");
      setIntroduction(user.introduction || "");
      setGithubId(user.githubId || "");
      setBlogUrl(user.blogUrl || "");
      setImageUrl(user.profileImage || "/default_profile_image.png");
    }
  }, [user]);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onNicknameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    if (target.value.length > 10) {
      setNickname(target.value.slice(0, 10));
    } else {
      setNickname(target.value);
    }
  };

  const onIntroductionChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    if (target.value.length > 150) {
      setIntroduction(target.value.slice(0, 150));
    } else {
      setIntroduction(target.value);
    }
  };

  const onGithubIdChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setGithubId(target.value);

  const onBlogUrlChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setBlogUrl(target.value);

  const handleImageInput: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    console.log("handleImageInput");
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.mainContainer} onSubmit={onSubmit}>
      <label htmlFor="profileImage">
        <img
          className={styles.profileImage}
          src={imageUrl}
          alt="profile Image"
        />
        <input
          className={styles.imageInput}
          type="file"
          accept="image/*"
          id="profileImage"
          name="profileImage"
          onChange={handleImageInput}
        />
        <div className={styles.imageInputText}>프로필 사진 변경</div>
      </label>
      <label htmlFor="nickname">
        <div className={styles.labelTitle}>이름</div>
        <div>
          <input
            className={styles.textInput}
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={onNicknameChange}
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <div className={styles.countText}>{nickname.length}/10</div>
        </div>
      </label>
      <label htmlFor="introduction">
        <div className={styles.labelTitle}>소개</div>
        <div>
          <textarea
            className={styles.textareaBox}
            id="introduction"
            name="introduction"
            value={introduction}
            onChange={onIntroductionChange}
          />
          <div className={styles.countText}>{introduction.length}/150</div>
        </div>
      </label>
      <label htmlFor="githubId">
        <div className={styles.labelTitle}>github ID</div>
        <input
          className={styles.textInput}
          type="text"
          id="githubId"
          name="githubId"
          value={githubId}
          onChange={onGithubIdChange}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
      </label>
      <label htmlFor="blogUrl">
        <div className={styles.labelTitle}>블로그</div>
        <input
          className={styles.textInput}
          type="text"
          id="blogUrl"
          name="blogUrl"
          value={blogUrl}
          onChange={onBlogUrlChange}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
      </label>
      <label>
        <div className={styles.labelTitle}>관심사</div>
        <TagInput />
      </label>
      <button className={styles.saveButton} type="submit">
        저장
      </button>
    </form>
  );
}
