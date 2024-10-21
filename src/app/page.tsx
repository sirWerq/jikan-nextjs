"use client";

import { useEffect, useState } from "react";
import seasonNowAnime from "@/app/api/seasonNowAnime/route";
import animeTop from "@/app/api/topAnime/route";
import Link from "next/link";
import Skeleton from "./components/skeleton/page";

export default function Home() {
    const [animeSeasonNow, setSeasonNow] = useState<SeasonAnime[]>([]);
    const [topAnime, setTopAnime] = useState<TopAnime[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAnime = async () => {
        try {
            setIsLoading(true);
            const dataTop = await animeTop(1);
            const dataSeason = await seasonNowAnime();
            setTopAnime(dataTop.data);
            setSeasonNow(dataSeason.data);
        } catch (error) {
            console.error("Error fetching anime data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchAnime();
    }, []);

    return (
        <div className="w-full h-full flex justify-center pt-[64px]">
            <div className="container">
                <div className="p-4">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="font-semibold text-3xl">
                            Seasonal Anime
                        </h1>
                        <Link href="#">view all</Link>
                    </div>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-12">
                            {animeSeasonNow.map((anime: SeasonAnime) => (
                                <Link
                                    href={`/details/${anime.mal_id}`}
                                    key={anime.mal_id}
                                    className="cursor-pointer group hover:bg-quaternary rounded-lg overflow-hidden"
                                >
                                    <div className="w-full h-44 lg:h-80 overflow-hidden">
                                        <img
                                            src={anime.images.webp.image_url}
                                            alt={anime.title}
                                            className="h-full object-cover w-full transition-transform duration-300 transform group-hover:scale-110"
                                        />
                                    </div>
                                    <p className="text-sm p-2 text-center drop-shadow-2xl">
                                        {anime.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="font-semibold text-3xl">Top Anime</h1>
                        <Link href="/topanime">view all</Link>
                    </div>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 lg:grid-cols-none lg:gap-0">
                            {topAnime.map((anime: TopAnime) => (
                                <Link
                                    href={`/details/${anime.mal_id}`}
                                    key={anime.mal_id}
                                    className="relative lg:flex lg:m-3 lg:bg-secondary lg:p-4 rounded-lg lg:gap-4 hover:bg-quaternary cursor-pointer lg:shadow-md"
                                >
                                    <div className="absolute z-10 bg-tertiary lg:bg-transparent m-auto rounded-full w-16 h-8 lg:h-full flex justify-center items-center lg:static">
                                        <p className="lg:text-black text-white">
                                            #{anime.rank}
                                        </p>
                                    </div>
                                    <div className="w-full h-44 lg:w-16 lg:h-20 overflow-hidden">
                                        <img
                                            src={
                                                anime.images.jpg.large_image_url
                                            }
                                            alt={anime.title}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-4 items-center justify-center w-full">
                                        <p className="lg:text-black text-white text-sm lg:p-0 lg:text-base p-2 text-center">
                                            {anime.title}
                                        </p>
                                        <p className="text-black hidden lg:block text-center">
                                            ⭐: {anime.score}
                                        </p>
                                        <p className="text-black hidden lg:block text-center">
                                            📺: {anime.episodes}
                                        </p>
                                        <p className="text-black hidden lg:block text-center">
                                            👥: {anime.scored_by}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
