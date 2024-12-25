'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { detailsManga, mangaCharacters } from '@/lib/jikanApi';
import TabsManga from '@/app/components/tabsManga/page';
import Loading from '@/app/components/loading/page';

export default function DetailsManga() {
    const params = useParams();
    const { id } = params;

    const [manga, setManga] = useState<any>([]);
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const dataManga = await detailsManga(id);
            const dataAnimeCharacters = await mangaCharacters(id);
            setCharacters(dataAnimeCharacters.data);
            setManga(dataManga.data);
        } catch (error) {
            console.error('Error fetching anime data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return isLoading ? (
        <Loading />
    ) : (
        <div className='container px-1 lg:px-0 relative'>
            <div className='w-full border-b-2'>
                <h1 className='font-semibold text-3xl'>{manga.title}</h1>
                <span className='text-sm'>{manga.title_english}</span>
            </div>
            <div className='w-full grid lg:grid-cols-4 pt-4 border-b-2 xl:grid-cols-5'>
                <div className='lg:col-span-1 flex flex-col items-center lg:items-start lg:px-2'>
                    {manga && manga.images && manga.images.jpg && (
                        <img
                            src={manga.images.jpg.image_url}
                            alt='Manga cover'
                        />
                    )}
                    <div className='flex gap-4 py-4'>
                        <button className='bg-primary/70 text-white w-28 h-8 rounded-md shadow-md flex items-center justify-center'>
                            Bookmark 📝
                        </button>
                        <button className='bg-primary/70 text-white w-28 h-8 rounded-md shadow-md flex items-center justify-center'>
                            Favorite 💖
                        </button>
                    </div>
                </div>
                <div className='lg:col-span-3 xl:col-span-4 p-4'>
                    <div className='lg:grid lg:grid-rows-3 w-full h-full'>
                        <div className='lg:row-span-2'>
                            <h2 className='font-semibold text-xl mb-2'>
                                Synopsis
                            </h2>
                            <p>{manga.synopsis}</p>
                        </div>
                        <div className='flex gap-4 pt-5 flex-wrap justify-center lg:justify-start lg:items-center lg:rows-span-1 text-white'>
                            <div className='bg-secondary w-44 h-8 flex justify-center items-center rounded-lg shadow-md bg-primary/70'>
                                <p>Rating ⭐️ : {manga.score}</p>
                            </div>
                            <div className='bg-secondary w-44 h-8 flex justify-center items-center rounded-lg shadow-md bg-primary/70'>
                                <p>Ranking 🏆 : {manga.rank}</p>
                            </div>
                            <div className='bg-secondary w-44 h-8 flex justify-center items-center rounded-lg shadow-md bg-primary/70'>
                                <p>Popularity 🔥 : {manga.popularity}</p>
                            </div>
                            <div className='bg-secondary w-44 h-8 flex justify-center items-center rounded-lg shadow-md bg-primary/70'>
                                <p>Members 👥 : {manga.members}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full grid lg:grid-cols-6 px-4 py-2 gap-8'>
                <div className='lg:col-span-1 text-sm p-2 flex flex-col gap-2 bg-secondary rounded-lg shadow-md h-full lg:h-[1200px] bg-white'>
                    <div>
                        <p>Airing</p>
                        <p className='text-slate-500'>{manga.status}</p>
                    </div>
                    <div>
                        <p>Type</p>
                        <p className='text-slate-500'>{manga.type}</p>
                    </div>
                    <div>
                        <p>Chapters</p>
                        <p className='text-slate-500'>
                            {manga.chapters == null ? '-' : manga.chapters}
                        </p>
                    </div>
                    <div>
                        <p>Volumes</p>
                        <p className='text-slate-500'>
                            {manga.volumes == null ? '-' : manga.volumes}
                        </p>
                    </div>
                    <div>
                        <p>Start Date</p>
                        <p className='text-slate-500'>
                            {new Date(manga.published.from).toLocaleDateString(
                                'en-EN',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                        </p>
                    </div>
                    <div>
                        <p>End Date</p>
                        <p className='text-slate-500'>
                            {manga.published.to == null
                                ? '-'
                                : new Date(
                                      manga.published.to
                                  ).toLocaleDateString('en-EN', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                  })}
                        </p>
                    </div>
                    <div>
                        <p>Authors</p>
                        <p className='text-slate-500'>
                            {manga.authors.map((p) => p.name).join(', ')}
                        </p>
                    </div>
                    <div>
                        <p>Themes</p>
                        <p className='text-slate-500'>
                            {manga.themes.map((p) => p.name).join(', ')}
                        </p>
                    </div>
                    <div>
                        <p>Genres</p>
                        <p className='text-slate-500'>
                            {manga.genres.map((p) => p.name).join(', ')}
                        </p>
                    </div>
                    <div>
                        <p>Rating</p>
                        <p className='text-slate-500'>{manga.rating}</p>
                    </div>
                    <div>
                        <p>Title Romaji</p>
                        <p className='text-slate-500'>{manga.title}</p>
                    </div>
                    <div>
                        <p>Title English</p>
                        <p className='text-slate-500'>{manga.title_english}</p>
                    </div>
                    <div>
                        <p>Title Japanese</p>
                        <p className='text-slate-500'>{manga.title_japanese}</p>
                    </div>
                    <div>
                        <p>Synonims</p>
                        <p className='text-slate-500'>
                            {manga.title_synonyms.length == 0
                                ? '-'
                                : manga.title_synonyms.map((p) => p).join(', ')}
                        </p>
                    </div>
                </div>
                <div className='lg:col-span-5'>
                    <TabsManga datas={manga} characters={characters} />
                </div>
            </div>
        </div>
    );
}
