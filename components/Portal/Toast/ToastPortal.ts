import { useEffect } from "react";
import { createPortal } from "react-dom";

import { TOAST_SHOW_TIME } from "constants/constants";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { resetToast } from "store/toastSlice";

const ToastPortal = ({ children }: { children: JSX.Element }) => {
  const { open } = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unmountToast = setTimeout(() => {
      if (open) dispatch(resetToast());
    }, TOAST_SHOW_TIME);

    return () => clearTimeout(unmountToast);
  }, [open]);

  return open
    ? createPortal(
        children,
        document.querySelector("#portal-toast") as HTMLElement
      )
    : null;
};

export default ToastPortal;
