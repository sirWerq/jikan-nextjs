import axios from 'axios';

const animeSearch = async (name, page) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/manga?q=${name}&page=${page}`
        );
        console.log('run fetch search anime');

        return fetchData.data;
    } catch (err) {
        throw new Error('fail get api data: ', err);
    }
};

export default animeSearch;
