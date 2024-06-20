import React, { ReactNode } from 'react';

type ContentLayoutProps = {
  children: ReactNode;
};

const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  return (
    <div className="content">
      {/* This is where the unique page content will be injected */}
      {children}
    </div>
  );
};

export default ContentLayout;
