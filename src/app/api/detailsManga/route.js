import axios from "axios";

const detailsManga = async (id) => {
    try {
        const fetchData = await axios.get(
            `https://api.jikan.moe/v4/manga/${id}/full`
        );
        console.log("run fetch detail manga");

        return fetchData.data;
    } catch (err) {
        throw new Error("fail get api data: ", err);
    }
};

export default detailsManga;
