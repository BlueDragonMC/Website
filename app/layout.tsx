import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { inter } from './font'

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
