import CancelIcon from "assets/icons/cancel/filled.svg";

import styles from "./Tag.module.scss";

interface props {
  content: string;
  onDelete: (content: string) => void;
}

const Tag = ({ content, onDelete }: props) => {
  return (
    <li className={styles.tagWrapper}>
      <div>{content}</div>
      <button
        onClick={() => {
          onDelete(content);
        }}
      >
        <CancelIcon />
      </button>
    </li>
  );
};

export default Tag;
