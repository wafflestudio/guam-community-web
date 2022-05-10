import Header from "./Header/Header";
import PostFormModal from "./Modals/PostFormModal/PostFormModal";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <PostFormModal />
    </>
  );
}
