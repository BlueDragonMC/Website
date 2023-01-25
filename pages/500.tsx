import "@/app/globals.css";
import { inter } from "@/app/font";
import Error from "@/components/Error";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ServerErrorPage() {
    return <div className={inter.className}>
        <Navbar />
        <div className="min-h-screen px-2 md:px-10 pt-16 md:pt-24">
            <Error code={500}>
                There was an internal server error while processing your request.
            </Error>
        </div>
        <Footer />
    </div>
}