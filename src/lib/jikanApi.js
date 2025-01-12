import axios from 'axios';

export const seasonNowAnime = async () => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/seasons/now?limit=24`
        );

        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};

export const animeTop = async (page) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/top/anime?page=${page}`
        );

        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};

export const mangaTop = async (page) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/top/manga?page=${page}`
        );

        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};

export const mangaSearch = async (name, page) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/manga?q=${name}&page=${page}`
        );

        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};

export const mangaCharacters = async (id) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/manga/${id}/characters`
        );
        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};

export const detailsManga = async (id) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/manga/${id}/full`
        );

        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};

export const detailsAnime = async (id) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/anime/${id}/full`
        );

        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};

export const animeStaff = async (id) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/anime/${id}/staff`
        );
        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};

export const animeSearch = async (name, page) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/anime?q=${name}&page=${page}`
        );
        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};

export const animeCharacters = async (id) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/anime/${id}/characters`
        );
        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};

export const getSpecificSeason = async (year, season, page) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${page}&limit=24`
        );
        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};
