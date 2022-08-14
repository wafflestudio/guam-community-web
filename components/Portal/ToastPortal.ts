import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { TOAST_SHOW_TIME } from "../../constants/constants";

const ToastPortal = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unmountToast = setTimeout(() => setMounted(false), TOAST_SHOW_TIME);

    return () => clearTimeout(unmountToast);
  }, []);

  return mounted
    ? createPortal(
        children,
        document.querySelector("#portal-toast") as HTMLElement
      )
    : null;
};

export default ToastPortal;
