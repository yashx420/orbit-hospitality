import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-orbit-dark">
      <Navbar />

      {/* Main Content with Curtain Effect */}
      <div className="relative z-10 bg-orbit-dark mb-[800px] md:mb-[400px] shadow-2xl rounded-b-[3rem]">
        <main className="flex-grow">{children}</main>
      </div>

      {/* Fixed Footer (Behind Content) */}
      <div className="fixed bottom-0 left-0 w-full z-0 h-[800px] md:h-[400px]">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
