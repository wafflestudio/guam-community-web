import React, { useState } from "react";

import Tag from "./Tag";

import styles from "./TagInput.module.scss";

const TagInput = () => {
  const [stackText, setStackText] = useState<string>("");
  const [stackList, setStackList] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 15) {
      setStackText(e.target.value.slice(0, 15));
    } else {
      setStackText(e.target.value.slice(0, 15));
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStack();
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addStack();
  };

  const addStack = () => {
    if (stackText === "") {
      return;
    } else if (!stackList.includes(stackText)) {
      setStackList([...stackList, stackText]);
      setStackText("");
    } else {
      setStackText("");
    }
  };

  const handleTagDelete = (content: string) => {
    setStackList(
      stackList.filter((stack) => {
        return stack !== content;
      })
    );
  };

  return (
    <div className={styles.layout}>
      <div className={styles.inputWrapper}>
        <input
          placeholder={"스택을 입력해 주세요 (최대 15자)"}
          value={stackText}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button disabled={stackText.length === 0} onClick={handleButtonClick}>
          등록
        </button>
      </div>
      <ul className={styles.tagList}>
        {stackList.map((stackText) => {
          return (
            <Tag
              key={stackText}
              content={stackText}
              onDelete={handleTagDelete}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TagInput;
