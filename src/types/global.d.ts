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

    interface Relation {
        relation: string;
        entry: {
            mal_id: number;
            name: string;
        }[];
    }

    interface SeasonList extends SeasonAnime {
        synopsis: string;
        score: number;
        season: string;
        year: number;
    }

    interface Pagination {
        has_next_page: boolean;
        last_visible_page: number;
    }

    interface Character {
        character: {
            mal_id: number;
            name: string;
            images: {
                jpg: {
                    image_url: string;
                };
            };
        };
        role: string;
        voice_actors: {
            language: string;
            person: {
                name: string;
                images: {
                    jpg: {
                        image_url: string;
                    };
                };
            };
        }[];
    }

    interface Staff {
        person: {
            mal_id: number;
            name: string;
            images: {
                jpg: {
                    image_url: string;
                };
            };
        };
        positions: string[];
    }

    interface TabsProps {
        datas: {
            trailer: {
                embed_url: string;
            };
            relations: Relation[];
        };
        characters: Character[];
        staffs: Staff[];
    }
}

export {};
