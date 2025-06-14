import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div>
    <Header />
    <main className="mx-auto px-4 min-w-[320px] max-w-2xl pb-10">{children}</main>
  </div>
);

export default Layout;
