import { useGetLettersQuery } from "../api/postsApi";
import MessagesPage from "../components/Messages/MessagesPage";
import PageTitle from "../components/PageTitle";
import { useAppSelector } from "../store/hooks";

const Messages = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { isLoading, error } = useGetLettersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: isLoggedIn === undefined,
  });

  return (
    <>
      <PageTitle title="Messages" />
      {error ? <>error</> : isLoading ? <img src="/loading.webp" /> : null}
      <MessagesPage />
    </>
  );
};

export default Messages;
