import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useModalRef = (
  ref: RefObject<HTMLDivElement>,
  setModal: Dispatch<SetStateAction<boolean>>
) =>
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setModal(false);
    };

    document.addEventListener("mousedown", listener);

    return () => document.removeEventListener("mousedown", listener);
  }, []);
