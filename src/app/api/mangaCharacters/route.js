import axios from "axios";

const mangaCharacters = async (id) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/manga/${id}/characters`
        );
        console.log("run fetch characters anime");
        return fetchData.data;
    } catch (err) {
        throw new Error("fail get api data: ", err);
    }
};

export default mangaCharacters;
