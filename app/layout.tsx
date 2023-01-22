import { Inter } from '@next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import './globals.css'
import { Github, Twitter } from '@icons-pack/react-simple-icons'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head />
      <body className={`min-h-screen ${inter.className}`}>
        <Navbar />
        <div className={"min-h-screen px-2 md:px-10 pt-4"}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
