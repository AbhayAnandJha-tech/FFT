"use client";

import { BrowserRouter } from "react-router-dom";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BrowserRouter>
      <Navbar />
      {children}
      <Footer />
    </BrowserRouter>
  );
}
