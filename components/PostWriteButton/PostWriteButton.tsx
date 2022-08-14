import WriteIcon from "../../assets/icons/write/button.svg";
import { useAppDispatch } from "../../store/hooks";
import { setPostFormModal } from "../../store/modalSlice";

import styles from "./PostWriteButton.module.scss";

export default function PostWriteButton({
  postDetailPage,
}: {
  postDetailPage: boolean;
}) {
  const dispatch = useAppDispatch();

  const onWriteClick = () => {
    dispatch(setPostFormModal({ expanded: false }));
  };

  return (
    <>
      <button
        className={`${styles.writeButton} ${
          postDetailPage && styles.detailPage
        }`}
        onClick={onWriteClick}
      >
        <WriteIcon />
      </button>
    </>
  );
}
