import React, { PropsWithChildren } from "react";

const HEIGHT = 400;
const WIDTH = 600;
const SIDEBAR_WIDTH = 200;

export interface LayoutProps extends PropsWithChildren {
  sidebar: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  return (
    <div
      style={{
        paddingLeft: SIDEBAR_WIDTH + "px",
      }}
    >
      <aside
        className="fixed top-0 left-0 border-r"
        style={{
          width: SIDEBAR_WIDTH + "px",
          height: HEIGHT + "px",
          minHeight: HEIGHT + "px",
        }}
      >
        {sidebar}
      </aside>
      <main
        style={{
          height: HEIGHT + "px",
        }}
      >
        {children}
      </main>
    </div>
  );
};
