import React from 'react';
import Header from './_components/Header';

// Use a default export here
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Provider;