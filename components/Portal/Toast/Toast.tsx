import React from "react";

import WarningIcon from "../../../assets/icons/warning.svg";
import { useAppSelector } from "../../../store/hooks";

import ToastPortal from "./ToastPortal";

import styles from "./Toast.module.scss";

const Toast = () => {
  const { text } = useAppSelector((state) => state.toast);

  return (
    <ToastPortal>
      <div className={styles.container}>
        <WarningIcon />
        <span className={styles["typo4-regular"]}>{text}</span>
      </div>
    </ToastPortal>
  );
};

export default Toast;
