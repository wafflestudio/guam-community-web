import { RefObject, useCallback, useEffect, useState } from "react";

export const useIntersectionObserver = (
  hasNext: boolean,
  modalRef: RefObject<HTMLDivElement>
) => {
  const [page, setPage] = useState(0);

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNext) {
        setPage((prev) => prev + 1);
      }
    },
    [hasNext]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (modalRef.current) observer.observe(modalRef.current);
  }, [handleObserver, modalRef]);

  return page;
};
