'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { detailsAnime, animeCharacters, animeStaff } from '@/lib/jikanApi';
import Tabs from '@/app/components/tabsAnime/page';
import Loading from '@/app/components/loading/page';

export default function DetailsPage() {
    const params = useParams();
    const { id } = params;

    const [datas, setDatas] = useState<any>([]);
    const [characters, setCharacters] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const dataDetailsAnime = await detailsAnime(id);
            const dataAnimeCharacters = await animeCharacters(id);
            const dataAnimeStaff = await animeStaff(id);
            setCharacters(dataAnimeCharacters.data);
            setDatas(dataDetailsAnime.data);
            setStaffs(dataAnimeStaff.data);
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
                <h1 className='font-semibold text-3xl'>{datas.title}</h1>
                <span className='text-sm'>{datas.title_english}</span>
            </div>
            <div className='w-full grid lg:grid-cols-4 pt-4 border-b-2 xl:grid-cols-5'>
                <div className='lg:col-span-1 flex flex-col items-center lg:items-start lg:px-2'>
                    <img src={datas.images.jpg.image_url} alt='' />
                    <div className='flex gap-4 py-4'>
                        <button className='bg-secondary w-28 h-8 rounded-md shadow-md flex items-center justify-center'>
                            Bookmark 📝
                        </button>
                        <button className='bg-secondary w-28 h-8 rounded-md shadow-md flex items-center justify-center'>
                            Favorite 💖
                        </button>
                    </div>
                </div>
                <div className='lg:col-span-3 xl:col-span-4'>
                    <div className='lg:grid lg:grid-rows-3 w-full h-full'>
                        <div className='lg:row-span-2'>
                            <h2 className='font-semibold text-xl mb-2'>
                                Synopsis
                            </h2>
                            <p>{datas.synopsis}</p>
                        </div>
                        <div className='flex gap-4 pt-5 flex-wrap justify-center lg:justify-start lg:items-center lg:rows-span-1'>
                            <div className='bg-secondary w-44 h-8 flex justify-center items-center rounded-lg shadow-md'>
                                <p>Rating ⭐️ : {datas.score}</p>
                            </div>
                            <div className='bg-secondary w-44 h-8 flex justify-center items-center rounded-lg shadow-md'>
                                <p>Ranking 🏆 : {datas.rank}</p>
                            </div>
                            <div className='bg-secondary w-44 h-8 flex justify-center items-center rounded-lg shadow-md'>
                                <p>Popularity 🔥 : {datas.popularity}</p>
                            </div>
                            <div className='bg-secondary w-44 h-8 flex justify-center items-center rounded-lg shadow-md'>
                                <p>Members 👥 : {datas.members}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full grid lg:grid-cols-6 px-4 py-2 gap-8'>
                <div className='lg:col-span-1 text-sm p-2 flex flex-col gap-2 bg-secondary rounded-lg shadow-md h-full lg:h-[1200px]'>
                    <div>
                        <p>Airing</p>
                        <p className='text-slate-500'>{datas.status}</p>
                    </div>
                    <div>
                        <p>Type</p>
                        <p className='text-slate-500'>{datas.type}</p>
                    </div>
                    <div>
                        <p>Episodes</p>
                        <p className='text-slate-500'>{datas.episodes}</p>
                    </div>
                    <div>
                        <p>Episode Duration</p>
                        <p className='text-slate-500'>{datas.duration}</p>
                    </div>
                    <div>
                        <p>Start Date</p>
                        <p className='text-slate-500'>
                            {new Date(datas.aired.from).toLocaleDateString(
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
                            {datas.aired.to == null
                                ? '-'
                                : new Date(datas.aired.to).toLocaleDateString(
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
                        <p>Season</p>
                        <p className='text-slate-500'>
                            {datas.season} {datas.year}
                        </p>
                    </div>
                    <div>
                        <p>Broadcast</p>
                        <p className='text-slate-500'>
                            {datas.broadcast.string}
                        </p>
                    </div>
                    <div>
                        <p>Producers</p>
                        <p className='text-slate-500'>
                            {datas.producers.map((p) => p.name).join(', ')}
                        </p>
                    </div>
                    <div>
                        <p>Studios</p>
                        <p className='text-slate-500'>
                            {datas.studios.map((p) => p.name).join(', ')}
                        </p>
                    </div>
                    <div>
                        <p>Themes</p>
                        <p className='text-slate-500'>
                            {datas.themes.map((p) => p.name).join(', ')}
                        </p>
                    </div>
                    <div>
                        <p>Genres</p>
                        <p className='text-slate-500'>
                            {datas.genres.map((p) => p.name).join(', ')}
                        </p>
                    </div>
                    <div>
                        <p>Source</p>
                        <p className='text-slate-500'>{datas.source}</p>
                    </div>
                    <div>
                        <p>Rating</p>
                        <p className='text-slate-500'>{datas.rating}</p>
                    </div>
                    <div>
                        <p>Title Romaji</p>
                        <p className='text-slate-500'>{datas.title}</p>
                    </div>
                    <div>
                        <p>Title English</p>
                        <p className='text-slate-500'>{datas.title_english}</p>
                    </div>
                    <div>
                        <p>Title Japanese</p>
                        <p className='text-slate-500'>{datas.title_japanese}</p>
                    </div>
                    <div>
                        <p>Synonims</p>
                        <p className='text-slate-500'>
                            {datas.title_synonyms.length == 0
                                ? '-'
                                : datas.title_synonyms.map((p) => p).join(', ')}
                        </p>
                    </div>
                </div>
                <div className='lg:col-span-5'>
                    <Tabs
                        datas={datas}
                        characters={characters}
                        staffs={staffs}
                    />
                </div>
            </div>
        </div>
    );
}
