import type { Metadata } from 'next';
import { Overpass } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/page';
import Footer from './components/footer/page';

const overpass = Overpass({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'AmiaList',
    description: 'Mark your anime list with AmiaList',
};

export default function RootLayout({
    children,
    register,
    login,
}: Readonly<{
    children: React.ReactNode;
    register: React.ReactNode;
    login: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${overpass.className} bg-primary`}>
                <Navbar />
                <div className='w-full h-full flex justify-center pt-[72px]'>
                    {children}
                </div>
                <Footer />
                {register}
                {login}
            </body>
        </html>
    );
}
