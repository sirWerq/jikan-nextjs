declare global {
  interface SeasonAnime {
    mal_id: number;
    rank: number;
    title: string;
    images: {
      webp: {
        image_url: string;
      };
    };
  }

  interface TopAnime {
    mal_id: number;
    rank: number;
    title: string;
    images: {
      jpg: {
        large_image_url: string;
      };
    };
    score: number;
    episodes: number;
    scored_by: number;
  }

  interface Manga {
    mal_id: number;
    rank: number;
    title: string;
    images: {
      jpg: {
        large_image_url: string;
      };
    };
    score: number;
    chapters: number;
    scored_by: number;
  }
}

export {};
