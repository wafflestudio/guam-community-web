import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const relativeDate = (date: string | undefined) => {
  if (date) return dayjs(date).locale(ko).fromNow();
};
