"use client";

import React from "react";
import { useEffect, useState } from "react";
import seasonNowAnime from "@/app/api/seasonNowAnime/route";
import animeTop from "@/app/api/topAnime/route";
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
        <div className="top px-4 lg:px-0 xl:px-0">
          <h1 className="font-semibold text-3xl py-4">Top Anime</h1>
          {isLoading ? (
            <Skeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {topAnime.map((anime: any) => (
                <div
                  key={anime.mal_id}
                  className="cursor-pointer group w-[70%] lg:w-[90%] m-auto"
                >
                  <div className="w-full h-96 overflow-hidden">
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
        <div className="top px-4 lg:px-0 xl:px-0">
          <h1 className="font-semibold text-3xl py-4">Seasonal Anime</h1>
          {isLoading ? (
            <Skeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {animeSeasonNow.map((anime: any) => (
                <div
                  key={anime.mal_id}
                  className="cursor-pointer group w-[70%] lg:w-[90%] m-auto"
                >
                  <div className="w-full h-96 overflow-hidden">
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
      </div>
    </div>
  );
}
