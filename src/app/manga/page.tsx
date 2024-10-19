"use client";

import { useState, useEffect } from "react";
import Skeleton from "../components/skeleton/page";
import mangaTop from "../api/TopManga/route";

export default function MangaPage() {
  const [topManga, setTopManga] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function fetchManga() {
    try {
      setIsLoading(true);
      const data = await mangaTop(currentPage);
      setTotalPages(data.pagination.last_visible_page);
      setTopManga(data.data);
    } catch (error) {
      console.error("Error fetching anime data:", error);
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
  return (
    <div className="w-full h-full flex justify-center pt-[64px]">
      <div className="container p-4">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-3xl">Manga</h1>
            <p>
              {currentPage} of {totalPages}
            </p>
          </div>
        </div>
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 lg:grid-cols-none lg:gap-0">
            {topManga.map((anime: Manga) => (
              <div
                key={anime.mal_id}
                className="relative lg:flex lg:m-3 lg:bg-secondary lg:p-4 rounded-lg lg:gap-4 hover:bg-quaternary cursor-pointer"
              >
                <div className="absolute z-10 bg-tertiary lg:bg-transparent m-auto rounded-full w-16 h-8 lg:h-full flex justify-center items-center lg:static">
                  <p className="lg:text-black">#{anime.rank}</p>
                </div>
                <div className="w-full h-44 lg:w-16 lg:h-20 overflow-hidden">
                  <img
                    src={anime.images.jpg.large_image_url}
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
                    📺: {anime.chapters}
                  </p>
                  <p className="text-black hidden lg:block text-center">
                    👥: {anime.scored_by}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex w-full gap-5 justify-center items-center">
          <button
            className="w-[120px] h-[50px] bg-quaternary rounded-lg hover:bg-tertiary hover:text-white"
            onClick={handlePreviousPage}
          >
            Previous Page
          </button>
          <button
            className="w-[120px] h-[50px] bg-quaternary rounded-lg hover:bg-tertiary hover:text-white"
            onClick={handleNextPage}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
