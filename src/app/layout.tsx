import type { Metadata } from "next";
import { Overpass } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/page";
import Footer from "./components/footer/page";

const overpass = Overpass({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "AmiaList",
    description: "Mark your anime list with AmiaList",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${overpass.className} bg-primary`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
