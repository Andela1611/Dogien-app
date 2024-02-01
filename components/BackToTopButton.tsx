import React, { useState } from "react";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <button
      className={`back-to-top-button ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <img src="/assets/arrowUp.png" alt="Back to top" />
    </button>
  );
};

export default BackToTopButton;
