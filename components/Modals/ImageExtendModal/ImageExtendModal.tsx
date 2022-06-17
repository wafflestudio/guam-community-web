import { useEffect, useRef, useState } from "react";

import BackIcon from "../../../assets/icons/back.svg";
import NextIcon from "../../../assets/icons/right.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setImageExtendedModal } from "../../../store/modalSlice";

import styles from "./ImageExtendModal.module.scss";

export default function ImageExtendModal() {
  const [imgNum, setImgNum] = useState(0);

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("asdf");
    if (imageRef.current?.style && containerRef.current) {
      containerRef.current.style.width = imageRef.current.style.width;
      console.log(imageRef.current.style.width);
    }
  }, [imageRef.current?.style]);

  const { open, paths } = useAppSelector(
    (state) => state.modals.imageExtendedModal
  );
  const dispatch = useAppDispatch();

  const closeModal = () =>
    dispatch(setImageExtendedModal({ open: false, paths: [] }));

  const onArrowClick = (direction: number) => {
    if (direction) {
      if (imgNum + 1 < paths.length) setImgNum((imgNum) => imgNum + 1);
    } else {
      if (imgNum - 1 >= 0) setImgNum((imgNum) => imgNum - 1);
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${"modal-wrapper"} ${
        open ? styles.open : styles.close
      }`}
      onClick={closeModal}
    >
      <div
        className={`${styles.container} ${"modal-container"}`}
        onClick={(e) => e.stopPropagation()}
        ref={containerRef}
      >
        <img ref={imageRef} src={process.env.BUCKET_URL + paths[imgNum]} />
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
