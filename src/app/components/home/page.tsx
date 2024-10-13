"use client";

import { useEffect, useState } from "react";
import seasonNowAnime from "@/app/api/seasonNowAnime/route";
import animeTop from "@/app/api/topAnime/route";
import Link from "next/link";
import Skeleton from "../skeleton/page";

export default function HomePage() {
  const [animeSeasonNow, setSeasonNow] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnime = async () => {
    try {
      setIsLoading(true);
      const dataTop = await animeTop();
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
    <div className="w-full h-full flex justify-center">
      <div className="container">
        <div className="p-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="font-semibold text-3xl">Seasonal Anime</h1>
            <Link href="#">view all</Link>
          </div>
          {isLoading ? (
            <Skeleton />
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-12">
              {animeSeasonNow.map((anime: any) => (
                <div
                  key={anime.mal_id}
                  className="cursor-pointer group hover:bg-quaternary"
                >
                  <div className="w-full h-44 lg:h-72 overflow-hidden">
                    <img
                      src={anime.images.webp.image_url}
                      alt={anime.title}
                      className="h-full object-cover w-full m-auto transition-transform duration-300 transform group-hover:scale-110"
                    />
                  </div>
                  <p className="text-sm p-2">{anime.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p4">
          <div className="flex justify-between items-center p-4">
            <h1 className="font-semibold text-3xl">Top Anime</h1>
            <Link href="#">view all</Link>
          </div>
          {isLoading ? (
            <Skeleton />
          ) : (
            topAnime.map((anime: any) => (
              <div
                key={anime.mal_id}
                className="flex m-3 bg-secondary p-4 rounded-lg gap-4 hover:bg-quaternary"
              >
                <div className="w-16 flex justify-center items-center">
                  <p className="text-black">{anime.rank}</p>
                </div>
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="w-16 h-20 object-cover rounded-md"
                />
                <div className="grid grid-cols-4 items-center w-full">
                  <p className="text-black">{anime.title}</p>
                  <p className="text-black">⭐: {anime.score}</p>
                  <p className="text-black">📺: {anime.episodes}</p>
                  <p className="text-black">♟️: {anime.scored_by}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
