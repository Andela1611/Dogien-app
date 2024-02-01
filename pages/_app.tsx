import React from "react";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import "../app/globals.css";
import BackToTopButton from "@/components/BackToTopButton";
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Component {...pageProps} />
      </div>
      <Footer />
      <BackToTopButton />
    </div>
  );
}

export default MyApp;
