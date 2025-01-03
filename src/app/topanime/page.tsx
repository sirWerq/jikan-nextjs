'use client';

import { useState, useEffect } from 'react';
import { animeTop } from '@/lib/jikanApi';
import Loading from '../components/loading/page';
import Link from 'next/link';

export default function TopAnimePage() {
    const [topAnime, setTopAnime] = useState<TopAnime[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    async function fetchManga() {
        try {
            setIsLoading(true);
            const data = await animeTop(currentPage);
            setTotalPages(data.pagination.last_visible_page);
            setTopAnime(data.data);
        } catch (error) {
            console.error('Error fetching anime data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchManga();
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (currentPage === 1) {
            setCurrentPage(totalPages);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (currentPage === totalPages) {
            setCurrentPage(1);
        }
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div className='container p-4'>
            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-semibold text-3xl'>Anime</h1>
                    <p>
                        {currentPage} of {totalPages}
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-4 gap-4 lg:grid-cols-none lg:gap-0'>
                {topAnime.map((anime: TopAnime) => (
                    <Link
                        href={`/details/${anime.mal_id}`}
                        key={anime.mal_id}
                        className='relative lg:flex lg:m-3 lg:bg-white hover:text-white lg:p-4 rounded-lg lg:gap-4 hover:bg-primary cursor-pointer lg:hover:text-white group'
                    >
                        <div className='absolute z-10 bg-primary lg:bg-transparent m-auto rounded-full w-16 h-8 lg:h-full flex justify-center items-center lg:static'>
                            <p className='group-hover:text-white text-white lg:text-black'>
                                #{anime.rank}
                            </p>
                        </div>
                        <div className='w-full h-44 lg:w-16 lg:h-20 overflow-hidden'>
                            <img
                                src={anime.images.jpg.large_image_url}
                                alt={anime.title}
                                className='w-full h-full object-cover rounded-md'
                            />
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-4 items-center justify-center w-full'>
                            <p className='text-sm lg:p-0 lg:text-base p-2 text-center'>
                                {anime.title}
                            </p>
                            <p className='hidden lg:block text-center'>
                                ⭐: {anime.score}
                            </p>
                            <p className='hidden lg:block text-center'>
                                📺: {anime.episodes}
                            </p>
                            <p className='hidden lg:block text-center'>
                                👥: {anime.scored_by}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='flex w-full gap-5 justify-center items-center'>
                <button
                    className='w-[120px] h-[50px] bg-primary rounded-lg hover:bg-primary/80 text-white'
                    onClick={handlePreviousPage}
                >
                    Previous Page
                </button>
                <button
                    className='w-[120px] h-[50px] bg-primary rounded-lg hover:bg-primary/80 text-white'
                    onClick={handleNextPage}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
}
