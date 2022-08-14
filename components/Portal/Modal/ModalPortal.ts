import { createPortal } from "react-dom";

import { useAppSelector } from "../../../store/hooks";

const ModalPortal = ({ children }: { children: JSX.Element }) => {
  const { open } = useAppSelector((state) => state.modals);

  return open !== null
    ? createPortal(
        children,
        document.querySelector("#portal-modal") as HTMLElement
      )
    : null;
};

export default ModalPortal;
