import "@/app/globals.css";
import NotFound from "@/app/not-found";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function NotFoundPage() {
    return <div className={inter.className}>
        <Navbar />
        <div className="min-h-screen px-2 md:px-10 pt-16 md:pt-24">
            <NotFound />
        </div>
        <Footer />
    </div>
}