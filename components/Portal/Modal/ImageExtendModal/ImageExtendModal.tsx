import { useRef, useState } from "react";

import BackIcon from "../../../../assets/icons/back.svg";
import NextIcon from "../../../../assets/icons/right.svg";
import { useAppSelector } from "../../../../store/hooks";

import styles from "./ImageExtendModal.module.scss";

export default function ImageExtendModal({
  closeModal,
}: {
  closeModal: () => {
    payload: undefined;
    type: string;
  };
}) {
  const [imgNum, setImgNum] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { paths } = useAppSelector((state) => state.modals.imageExtendedModal);

  const onArrowClick = (direction: number) => {
    if (direction) {
      if (imgNum + 1 < paths.length) setImgNum((imgNum) => imgNum + 1);
    } else {
      if (imgNum - 1 >= 0) setImgNum((imgNum) => imgNum - 1);
    }
  };

  const onImageLoad = () => {
    if (imageRef.current && containerRef.current) {
      containerRef.current.style.width =
        imageRef.current.clientWidth.toString() + "px";
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${"modal-wrapper"}`}
      onClick={closeModal}
    >
      <div
        className={`${styles.container} ${"modal-container"}`}
        onClick={(e) => e.stopPropagation()}
        ref={containerRef}
      >
        {paths[imgNum] ? (
          <img
            ref={imageRef}
            src={process.env.BUCKET_URL + paths[imgNum]}
            onLoad={onImageLoad}
          />
        ) : null}
        {imgNum - 1 >= 0 ? (
          <button className={styles.prev} onClick={() => onArrowClick(0)}>
            <BackIcon />
          </button>
        ) : null}
        {imgNum + 1 < paths.length ? (
          <button className={styles.next} onClick={() => onArrowClick(1)}>
            <NextIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
}
