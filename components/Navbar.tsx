import React from "react";
import Link from "next/link";
const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white">
      <div className="max-w-screen-xl flex items-center justify-center mx-auto p-4">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <span className="text-4xl font-semibold">Dogien</span>
            <img
              src="/assets/paw.svg"
              alt="Dogien Logo"
              className="w-6 h-6 ml-2"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
