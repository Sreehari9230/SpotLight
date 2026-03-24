import React from "react";
import { Github, LetterText, Linkedin, Mail } from "lucide-react";
import { SiLetterboxd } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Feedback */}
        <div className="text-center text-sm sm:text-base">
          <p className="opacity-80">Got feedback, bugs, or feature ideas?</p>
          <a
            href="mailto:sreehari.fullstackdev@gmail.com"
            className="inline-flex items-center gap-2 mt-3 hover:text-primary transition"
          >
            <Mail className="w-4 h-4" />
            sreehari.fullstackdev@gmail.com
          </a>
        </div>

        {/* Divider */}
        <div className="w-full max-w-md h-px bg-base-300" />

        {/* Socials */}
        <div className="flex gap-6">
          <a
            href="https://github.com/Sreehari9230"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>

          <a
            href="https://letterboxd.com/rambo9320/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
            aria-label="Letterboxd"
          >
            <SiLetterboxd className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>

          <a
            href="https://www.linkedin.com/in/sreehari-m-236266272/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>

        {/* Credit */}
        <p className="text-xs sm:text-sm opacity-70 text-center">
          © {new Date().getFullYear()} — Built by{" "}
          <span className="font-semibold">Sreehari M</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
