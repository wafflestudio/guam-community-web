import axios, { AxiosRequestConfig } from "axios";
import {
  ChangeEventHandler,
  FormEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import CameraIcon from "assets/icons/camera.svg";
import { useAppDispatch } from "store/hooks";
import { usePostLetterMutation } from "store/postsApi";
import { setToast } from "store/toastSlice";
import styles from "styles/Messages.module.scss";
import { IImageUrl } from "types/types";
import useRouterInfo from "utils/useRouterInfo";

import MessageImages from "./MessageImages";

export default function MessageForm({
  messageListRef,
}: {
  messageListRef: RefObject<HTMLUListElement>;
}) {
  const [messageInput, setMessageInput] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<IImageUrl[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const { pairId } = useRouterInfo();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "136px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [textareaRef, messageInput]);

  const onMessageChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => setMessageInput(target.value);

  const clickImageInput = () => {
    if (imageUrls.length >= 5) {
      alert("사진은 5장까지 첨부 가능합니다");
      return;
    }
    photoInputRef.current?.click();
  };

  const [postMessage] = usePostLetterMutation();

  const disabled = messageInput.trim().length === 0 && images.length === 0;

  const onSubmitMessage: FormEventHandler = async (e) => {
    e.preventDefault();

    if (disabled) return;

    const data = new FormData();
    const object = {
      to: pairId,
      text: messageInput.trim().length !== 0 ? messageInput.trim() : "사진",
    };
    Object.keys(object).forEach((key) =>
      data.append(key, object[key as keyof object])
    );
    images.length !== 0 &&
      images.forEach((image) => {
        data.append("images", image);
      });

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const { data: urlData } = await postMessage(data);
      const { presignedUrls } = urlData;
      if (presignedUrls?.length) {
        await Promise.all(
          presignedUrls.map((url: string, i: number) => {
            const options: AxiosRequestConfig = {
              url: `/presigned_bucket_url/${
                url.split(process.env.BUCKET_URL || "")[1]
              }`,
              method: "PUT",
              headers: { "Content-Type": images[i].type },
              data: images[i],
            };
            axios(options);
          })
        );
      }
      setMessageInput("");
      setImages([]);
      setImageUrls([]);
    } catch (e) {
      console.log(e);
      dispatch(setToast({ open: true, text: "게시글 작성에 실패했습니다." }));
    }

    messageListRef.current?.scrollTo(0, 0);
  };

  return (
    <div className={styles.messageFormContainer}>
      <MessageImages
        photoInputRef={photoInputRef}
        images={images}
        setImages={setImages}
        setImageUrls={setImageUrls}
        imageUrls={imageUrls}
      />
      <textarea
        ref={textareaRef}
        className={`${styles["typo4-regular"]}`}
        placeholder="쪽지를 남겨보세요."
        value={messageInput}
        onChange={onMessageChange}
      />
      <button
        type="button"
        className={styles.addPhoto}
        onClick={clickImageInput}
        disabled={imageUrls.length >= 5}
      >
        <CameraIcon />
      </button>
      <button
        className={`typo5-medium ${styles.submit}`}
        onClick={onSubmitMessage}
        disabled={disabled}
      >
        전송
      </button>
    </div>
  );
}
