"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Skeleton from "../components/skeleton/page";
import mangaTop from "../api/TopManga/route";

export default function MangaPage() {
  const [topManga, setTopManga] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchManga() {
    try {
      setIsLoading(true);
      const data = await mangaTop();
      setTopManga(data.data);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchManga();
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="container p-4">
        <div className="p-4">
          <h1 className="font-semibold text-3xl">Manga</h1>
        </div>
        {isLoading ? (
          <Skeleton />
        ) : (
          topManga.map((manga: any) => (
            <div
              key={manga.mal_id}
              className="flex m-3 bg-secondary p-4 rounded-lg gap-4 hover:bg-quaternary"
            >
              <div className="w-16 flex justify-center items-center">
                <p className="text-black">{manga.rank}</p>
              </div>
              <img
                src={manga.images.jpg.large_image_url}
                alt={manga.title}
                className="w-16 h-20 object-cover rounded-md"
              />
              <div className="grid grid-cols-4 items-center w-full">
                <p className="text-black">{manga.title}</p>
                <p className="text-black">⭐: {manga.score}</p>
                <p className="text-black">📺: {manga.chapters}</p>
                <p className="text-black">♟️: {manga.scored_by}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
