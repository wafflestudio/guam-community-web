import React from "react";

import WarningIcon from "../../assets/icons/warning.svg";
import { useAppSelector } from "../../store/hooks";

import styles from "./Toast.module.scss";

const ToastWrapper = () => {
  const { text } = useAppSelector((state) => state.toast);

  return (
    <div className={styles.container}>
      <WarningIcon />
      <span className={styles["typo4-regular"]}>{text}</span>
    </div>
  );
};

export default ToastWrapper;
