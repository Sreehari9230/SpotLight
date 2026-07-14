import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";

import { useThemeStore } from "./store/useThemeStore";
import Footer from "./components/Footer";
import { useMovieStore } from "./store/useMovieStore";
import LetterBoxd from "./pages/LetterBoxd";

const App = () => {
  const { fetchGenres, fetchLanguages } = useMovieStore();
  useEffect(() => {
    fetchGenres();
    fetchLanguages();
  }, [fetchGenres, fetchLanguages]);
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/letterboxd" element={<LetterBoxd />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
