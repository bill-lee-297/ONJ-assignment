import React from "react";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <Header />
    <main className="mx-auto px-4 min-w-[320px] max-w-2xl">
      {children}
    </main>
  </div>
);

export default Layout; 