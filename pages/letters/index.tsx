import MessagesPage from "../../components/Messages/MessagesPage";
import PageTitle from "../../components/PageTitle";
import { useGetLettersQuery } from "../../store/postsApi";
import { useLogin } from "../../utils/useLogin";

const Messages = () => {
  const isLoggedIn = useLogin();

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
