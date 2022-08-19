import {
  ChangeEventHandler,
  FormEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import CameraIcon from "../../assets/icons/camera.svg";
import { usePostLetterMutation } from "../../store/postsApi";
import { IImageUrl } from "../../types/types";
import useRouterInfo from "../../utils/useRouterInfo";

import MessageImages from "./MessageImages";

import styles from "./Messages.module.scss";

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

  const onSubmitMessage: FormEventHandler = async (e) => {
    e.preventDefault();

    if (messageInput.trim().length === 0 && images.length === 0) return;

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

    postMessage(data);

    setMessageInput("");
    setImages([]);
    setImageUrls([]);

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
        className={`${styles.addPhoto} ${
          imageUrls.length >= 5 && styles.disabled
        }`}
        onClick={clickImageInput}
        disabled={imageUrls.length >= 5}
      >
        <CameraIcon />
      </button>
      <button
        className={`${styles["typo5-medium"]} ${styles.submit} ${
          messageInput.trim() === "" && images.length === 0 && styles.disabled
        }`}
        onClick={onSubmitMessage}
      >
        전송
      </button>
    </div>
  );
}
