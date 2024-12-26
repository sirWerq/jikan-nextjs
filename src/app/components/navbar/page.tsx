'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export default function Navbar() {
    const [toggleHamburger, setToggleHamburger] = useState(false);
    const [search, setSearch] = useState('');
    const { data: session } = useSession();

    const pathname = usePathname();
    const router = useRouter();

    const handleToggle = () => {
        setToggleHamburger((toggleHamburger) => !toggleHamburger);
    };

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/search?q=${search}`);
        }
    };

    return (
        <>
            <div className='w-full flex items-center justify-center bg-primary/70 p-3 fixed z-50 text-white'>
                <div className='container flex justify-between items-center'>
                    <Link href='/' className='font-semibold text-2xl'>
                        AmiaList
                    </Link>
                    <div className='w-full h-full ml-4 justify-between gap-8 items-center z-50 flex'>
                        <ul className='hidden lg:flex gap-1'>
                            <li>
                                <Link
                                    href='/'
                                    className={`link ${
                                        pathname === '/' ? 'activeLink' : ''
                                    } p-2 rounded-md`}
                                >
                                    Anime
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/manga'
                                    className={`link ${
                                        pathname === '/manga'
                                            ? 'activeLink'
                                            : ''
                                    } p-2 rounded-md`}
                                >
                                    Manga
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/topanime'
                                    className={`link ${
                                        pathname === '/topanime'
                                            ? 'activeLink'
                                            : ''
                                    } p-2 rounded-md`}
                                >
                                    Top Anime
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className={`link ${
                                        pathname === '/#' ? 'activeLink' : ''
                                    } p-2 rounded-md`}
                                >
                                    Seasons
                                </Link>
                            </li>
                        </ul>
                        <div className='w-full lg:w-auto flex items-center lg:gap-4 gap-1'>
                            <form
                                className='relative mx-auto text-gray-600 h-full flex items-center'
                                onSubmit={handleSearch}
                            >
                                <input
                                    className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm w-full focus:outline-none'
                                    type='search'
                                    name='search'
                                    placeholder='Search'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button
                                    type='submit'
                                    className='absolute right-0 top-0 mt-2 mr-4'
                                >
                                    <svg
                                        className='text-gray-600 h-6 w-4 fill-current'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 56.966 56.966'
                                        width='512px'
                                        height='512px'
                                    >
                                        <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
                                    </svg>
                                </button>
                            </form>
                            <div className='hidden md:flex gap-4'>
                                {session ? (
                                    <>
                                        <img
                                            src='/hero.jpg'
                                            alt='user'
                                            className='w-10 h-10 rounded-full'
                                        />
                                        <button onClick={() => signOut()}>
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href='/register'>Register</Link>
                                        <Link href='/login'>Login</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='fixed bottom-3 right-3 lg:hidden z-50'>
                <div
                    onClick={handleToggle}
                    className='p-4 bg-slate-300 rounded-full flex flex-col justify-center items-center relative'
                >
                    <p
                        className={`transition-all duration-300 transform ${
                            toggleHamburger
                                ? 'rotate-45 opacity-100'
                                : 'rotate-0 opacity-100'
                        } cursor-pointer`}
                    >
                        ➕
                    </p>
                </div>
                <div
                    className={`${
                        toggleHamburger
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 translate-y-10 pointer-events-none'
                    } w-64 h-40 p-2 absolute -top-32 text-white right-14 bg-primary/80 flex flex-wrap gap-6 items-center justify-center rounded-md transition-all duration-300 ease-in-out transform`}
                >
                    <Link href='/' className='text-center'>
                        <p>🎬</p>
                        <p>anime</p>
                    </Link>
                    <Link href='/manga' className='text-center'>
                        <p>📖</p>
                        <p>manga</p>
                    </Link>
                    <Link href='/topanime' className='text-center'>
                        <p>🏆</p>
                        <p>top anime</p>
                    </Link>
                    <Link href='/#' className='text-center'>
                        <p>▶️</p>
                        <p>seasons</p>
                    </Link>
                    {/* <Link href='/#' className='text-center'>
                        <p>👤</p>
                        <p>account</p>
                    </Link> */}
                    <Link href='/login' className='text-center'>
                        <p>👤</p>
                        <p>Login</p>
                    </Link>
                    <Link href='/register' className='text-center'>
                        <p>👤</p>
                        <p>Register</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
