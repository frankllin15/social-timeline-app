import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <Header />
      <main className="flex flex-1 w-full items-start justify-center bg-zinc-900 px-4 md:px-12 lg:px-20">
        {<Outlet />}
      </main>
      <Footer />
    </div>
  );
};
