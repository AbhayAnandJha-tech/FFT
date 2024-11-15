'use client'

import Footer from '@/components/footer'
import Navbar from '@/components/Navbar/Navbar'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
