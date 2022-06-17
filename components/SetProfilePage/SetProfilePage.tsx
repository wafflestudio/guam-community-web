import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserState } from "../../store/userSlice";

interface IProfileObject {
  nickname: string;
  introduction?: null | string;
  githubId?: null | string;
  blogUrl?: null | string;
  profileImage?: File | Blob | string;
}

export default function SetProfilePage() {
  const [nickname, setNickname] = useState<string>("");
  const [introduction, setIntroduction] = useState<null | string>(null);
  const [githubId, setGithubId] = useState<null | string>(null);
  const [blogUrl, setBlogUrl] = useState<null | string>(null);
  const [profileImage, setProfileImage] = useState<File | Blob | null | string>(
    null
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.profileSet) {
      setNickname(user.nickname || "");
      setIntroduction(user.introduction);
      setGithubId(user.githubId);
      setBlogUrl(user.blogUrl);
      if (user.profileImage) {
        setProfileImage(user.profileImage);
        setImageUrl(user.profileImage);
      }
    }
  }, [user]);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onNicknameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setNickname(target.value);

  const onIntroductionChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => setIntroduction(target.value);

  const onGithubIdChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setGithubId(target.value);

  const onBlogUrlChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setBlogUrl(target.value);

  const handleImageInput: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    if (target.files) {
      setProfileImage(target.files[0]);
      const url = URL.createObjectURL(target.files[0]);
      setImageUrl(url);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setImageUrl(null);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const object: IProfileObject = {
      nickname,
      ...(introduction && { introduction }),
      ...(blogUrl && { blogUrl }),
      ...(githubId && { githubId }),
    };

    if (profileImage === null && user.profileImage !== null) {
      object.profileImage = await fetch("default_profile_image.png").then(
        (res) => res.blob()
      );
    } else if (profileImage instanceof File) object.profileImage = profileImage;

    Object.keys(object).forEach((key) =>
      formData.append(key, object[key as keyof object])
    );

    try {
      const { data } = await axios.patch(`/api/users/${user.id}`, formData);
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
        nickname
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={nickname || ""}
          onChange={onNicknameChange}
        />
      </label>
      <label htmlFor="introduction">
        introduction
        <textarea
          id="introduction"
          name="introduction"
          value={introduction || ""}
          onChange={onIntroductionChange}
        />
      </label>
      <label htmlFor="githubId">
        githubId
        <input
          type="text"
          id="githubId"
          name="githubId"
          value={githubId || ""}
          onChange={onGithubIdChange}
        />
      </label>
      <label htmlFor="blogUrl">
        blogUrl
        <input
          type="text"
          id="blogUrl"
          name="blogUrl"
          value={blogUrl || ""}
          onChange={onBlogUrlChange}
        />
      </label>
      <label htmlFor="profileImage">
        profileImage
        <input
          type="file"
          accept="image/*"
          id="profileImage"
          name="profileImage"
          onChange={handleImageInput}
        />
      </label>
      <button type="button" onClick={removeProfileImage}>
        기본 이미지 세팅
      </button>
      <button type="submit">등록</button>
      {imageUrl ? (
        typeof profileImage === "string" ? (
          <img src={process.env.BUCKET_URL + imageUrl + "?" + Date.now()} />
        ) : (
          <img src={imageUrl} />
        )
      ) : (
        <img src={"/default_profile_image.png"} />
      )}
    </form>
  );
}
