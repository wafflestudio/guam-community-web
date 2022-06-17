import React from "react";

import Header from "./Header/Header";
import PostFormModal from "./PostFormModal/PostFormModal";

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
