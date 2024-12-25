'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { animeSearch, mangaSearch } from '@/lib/jikanApi';
import Link from 'next/link';
import Loading from '../components/loading/page';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState('');
    const [searchResultAnime, setSearchResultAnime] = useState([]);
    const [searchResultManga, setSearchResultManga] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tabs, setTabs] = useState(1);
    const [currentPageAnime, setCurrentPageAnime] = useState(1);
    const [currentPageManga, setCurrentPageManga] = useState(1);
    const [totalPagesAnime, setTotalPagesAnime] = useState(0);
    const [totalPagesManga, setTotalPagesManga] = useState(0);

    const fetchData = async (search: any) => {
        try {
            setIsLoading(true);
            const dataAnime = await animeSearch(search, currentPageAnime);
            const dataManga = await mangaSearch(search, currentPageManga);
            setSearchResultAnime(dataAnime.data);
            setSearchResultManga(dataManga.data);
            setTotalPagesAnime(dataAnime.pagination.last_visible_page);
            setTotalPagesManga(dataManga.pagination.last_visible_page);
        } catch (error) {
            console.error('Error fetching anime data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearch(query);
            fetchData(query);
        }
    }, [searchParams]);

    const handlePreviousPageAnime = () => {
        if (currentPageAnime > 1) {
            setCurrentPageAnime(currentPageAnime - 1);
        } else if (currentPageAnime === 1) {
            setCurrentPageAnime(totalPagesAnime);
        }
    };

    const handleNextPageAnime = () => {
        if (currentPageAnime < totalPagesAnime) {
            setCurrentPageAnime(currentPageAnime + 1);
        } else if (currentPageAnime === totalPagesAnime) {
            setCurrentPageAnime(1);
        }
    };
    const handlePreviousPageManga = () => {
        if (currentPageManga > 1) {
            setCurrentPageManga(currentPageManga - 1);
        } else if (currentPageManga === 1) {
            setCurrentPageManga(totalPagesManga);
        }
    };

    const handleNextPageManga = () => {
        if (currentPageManga < totalPagesManga) {
            setCurrentPageManga(currentPageManga + 1);
        } else if (currentPageManga === totalPagesManga) {
            setCurrentPageManga(1);
        }
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div className='container'>
            <h1 className='font-semibold text-3xl border-b-secondary border-b-2 py-4'>
                Hasil Pencarian : {search}
            </h1>
            <div className='flex gap-4 border-b-secondary border-b-2'>
                <span
                    onClick={() => setTabs(1)}
                    className={`${
                        tabs === 1 ? 'bg-primary rounded-lg text-white' : ''
                    } w-24 flex justify-center items-center h-14 cursor-pointer`}
                >
                    Anime
                </span>
                <span
                    onClick={() => setTabs(2)}
                    className={`${
                        tabs === 2 ? 'bg-primary rounded-lg text-white' : ''
                    } w-24 flex justify-center items-center h-14 cursor-pointer`}
                >
                    Manga
                </span>
            </div>
            {tabs === 1 && (
                <>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-12 m-2'>
                        {searchResultAnime.map((item: any) => (
                            <Link
                                href={`/details/${item.mal_id}`}
                                key={item.mal_id}
                                className='cursor-pointer group hover:bg-primary rounded-lg overflow-hidden hover:text-white'
                            >
                                <img
                                    src={item.images.jpg.image_url}
                                    alt={item.title}
                                />
                                <p>{item.title}</p>
                            </Link>
                        ))}
                    </div>
                    <div className='flex w-full gap-5 justify-center items-center my-4'>
                        <button
                            className='w-[120px] h-[50px] bg-primary rounded-lg hover:bg-primary/80 text-white'
                            onClick={handlePreviousPageAnime}
                        >
                            Previous Page
                        </button>
                        <button
                            className='w-[120px] h-[50px] bg-primary rounded-lg hover:bg-primary/80 text-white'
                            onClick={handleNextPageAnime}
                        >
                            Next Page
                        </button>
                    </div>
                </>
            )}
            {tabs === 2 && (
                <>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-12 m-2'>
                        {searchResultManga.map((item: any) => (
                            <Link
                                href={`/details/${item.mal_id}`}
                                key={item.mal_id}
                                className='cursor-pointer group hover:bg-primary rounded-lg overflow-hidden hover:text-white'
                            >
                                <img
                                    src={item.images.jpg.image_url}
                                    alt={item.title}
                                />
                                <p>{item.title}</p>
                            </Link>
                        ))}
                    </div>
                    <div className='flex w-full gap-5 justify-center items-center my-4'>
                        <button
                            className='w-[120px] h-[50px] bg-primary rounded-lg hover:bg-primary/80 text-white'
                            onClick={handlePreviousPageManga}
                        >
                            Previous Page
                        </button>
                        <button
                            className='w-[120px] h-[50px] bg-primary rounded-lg hover:bg-primary/80 text-white'
                            onClick={handleNextPageManga}
                        >
                            Next Page
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
