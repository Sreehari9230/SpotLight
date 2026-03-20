import React, { useEffect, useState } from "react";
import { Clapperboard, Sparkles,ListOrdered } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b border-neutral-600 bg-base-100 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative mx-auto max-w-7xl px-4 py-2 flex items-center h-12">
        {/* Left spacer */}
        {/* <div className="w-8" /> */}

        {/* upcoming feture button and its modal */}
        <button
          onClick={() => document.getElementById("future_features").showModal()}
          className="btn btn-ghost btn-sm gap-2 opacity-70 hover:opacity-100 transition"
        >
          <ListOrdered size={14} />
          <span className="hidden sm:inline">Upcoming</span>
        </button>

        {/* Center branding */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <Clapperboard size={16} className="text-base-content" />
          <span className="text-sm sm:text-base font-semibold tracking-tight">
            Spotlight
          </span>
        </div>

        {/* Right controls */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
