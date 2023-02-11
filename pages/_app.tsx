import { inter } from "@/app/font";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AppProps } from "next/app";
import "../app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={inter.className}>
            <Navbar />
            <div className={"min-h-screen px-2 pt-4 md:px-10"}>
                <Component {...pageProps} />
            </div>
            <Footer />
        </div>
    );
}
