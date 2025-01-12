'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSpecificSeason } from '@/lib/jikanApi';
import Loading from '@/app/components/loading/page';
import Link from 'next/link';
import Image from 'next/image';

export default function SeasonsPage({
    params,
}: {
    params: { slug: [string, string] };
}) {
    const [seasonAnime, setSeasonAnime] = useState<SeasonList[]>([]);
    const [paginationAnime, setPaginationAnime] = useState<Pagination>({
        has_next_page: false,
        last_visible_page: 1,
    });
    const [isLoading, setIsLoading] = useState(true);

    const { slug } = params;
    const [year, season] = slug;
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = parseInt(searchParams.get('page') || '1', 10);

    const setParameter = (params: Record<string, string | number>) => {
        const newParams = new URLSearchParams(searchParams.toString());
        Object.entries(params).forEach(([key, value]) => {
            newParams.set(key, String(value));
        });
        router.push(`/seasons/${year}/${season}?${newParams.toString()}`);
    };

    const getLeftRightButtonSeason = (season: string, year: string) => {
        const seasonData = ['winter', 'spring', 'summer', 'fall'];
        const currIndex = seasonData.indexOf(season);
        const left: Record<string, number> = {};
        const right: Record<string, number> = {};

        if (currIndex === 0) {
            left['fall'] = parseInt(year) - 1;
        } else {
            left[seasonData[currIndex - 1]] = parseInt(year);
        }

        for (let i = currIndex + 1; i < currIndex + 3; i++) {
            let currYear = parseInt(year);
            let index = i;
            if (index > 3) {
                index -= 4;
                currYear += 1;
            }
            right[seasonData[index]] = currYear;
        }

        return [left, right];
    };

    const handleIncrementClick = () => {
        if (paginationAnime.has_next_page) {
            setParameter({ page: page + 1 });
        } else {
            setParameter({ page: 1 });
        }
    };

    const handleDecrementClick = () => {
        if (page <= 1) {
            setParameter({ page: paginationAnime.last_visible_page });
        } else {
            setParameter({ page: page - 1 });
        }
    };

    const [left, right] = getLeftRightButtonSeason(season, year);
    const leftSeason = Object.keys(left)[0];
    const leftYear = left[leftSeason];
    const rightSeasons = Object.keys(right);
    const rightYears = Object.values(right);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await getSpecificSeason(year, season, page);
                setSeasonAnime(res.data);
                setPaginationAnime(res.pagination);
            } catch (err) {
                console.error('Failed to fetch data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [year, season, page]);

    return (
        <div className='container min-h-screen w-full'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='p-4 '>
                    <div className='flex justify-around gap-4 mb-4 text-sm sm:text-base'>
                        {leftSeason && leftYear && (
                            <Link
                                href={`/seasons/${leftYear}/${leftSeason}`}
                                className='text-slate-600 hover:text-primary border-b border-black px-2'
                            >
                                {leftSeason.charAt(0).toUpperCase() +
                                    leftSeason.slice(1)}{' '}
                                {leftYear}
                            </Link>
                        )}
                        <Link
                            href={`/seasons/${year}/${season}`}
                            className='text-slate-600 hover:text-primary border-b border-black px-2'
                        >
                            {season.charAt(0).toUpperCase() + season.slice(1)}{' '}
                            {year}
                        </Link>
                        {rightSeasons.map((rightSeason, index) => (
                            <Link
                                key={index}
                                href={`/seasons/${rightYears[index]}/${rightSeason}`}
                                className='text-slate-600 hover:text-primary border-b border-black px-2'
                            >
                                {rightSeason.charAt(0).toUpperCase() +
                                    rightSeason.slice(1)}{' '}
                                {rightYears[index]}
                            </Link>
                        ))}
                    </div>

                    {seasonAnime.length === 0 ? (
                        <p className='min-h-screen flex justify-center items-center text-4xl'>
                            Data tidak ada
                        </p>
                    ) : (
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6'>
                            {seasonAnime.map((anime, index) => (
                                <div
                                    className='h-full bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between'
                                    key={index}
                                >
                                    <div className='p-2 flex justify-center items-center text-center'>
                                        <Link
                                            href={`/details/${anime.mal_id}`}
                                            className='text-lg font-semibold'
                                        >
                                            {anime.title}
                                        </Link>
                                    </div>
                                    <div className='flex gap-4 my-4 flex-grow'>
                                        <div className='flex-1 w-full'>
                                            <Image
                                                src={
                                                    anime.images.webp.image_url
                                                }
                                                alt={anime.title}
                                                width={200}
                                                height={200}
                                                className='rounded-md object-cover'
                                            />
                                        </div>
                                        <div className='flex-[2] h-[200px] hover:overflow-auto overflow-hidden'>
                                            <p className='text-sm'>
                                                {anime.synopsis}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center mt-4'>
                                        <div>
                                            <p>⭐: {anime.score}</p>
                                        </div>
                                        <div>
                                            <p className='text-sm'>
                                                📺:{' '}
                                                {anime.season
                                                    ? anime.season
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      anime.season.slice(1)
                                                    : 'No Season Info'}{' '}
                                                {anime.year}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='flex justify-center gap-7 mt-6'>
                        <button
                            onClick={handleDecrementClick}
                            className='w-[120px] h-[50px] bg-primary rounded-lg hover:bg-primary/80 text-white'
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleIncrementClick}
                            className='w-[120px] h-[50px] bg-primary rounded-lg hover:bg-primary/80 text-white'
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
