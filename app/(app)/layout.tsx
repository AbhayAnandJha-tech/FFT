"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname() ?? ""; // Fallback to an empty string if pathname is null

  // Regular expression to match any course under `/course/<course-name>/video-lecture`
  const isCourseVideoLecture = /^\/course\/[^/]+\/video-lecture$/.test(
    pathname
  );

  return (
    <>
      {!isCourseVideoLecture && <Navbar />}
      {children}
      {!isCourseVideoLecture && <Footer />}
    </>
  );
}
