import axios from "axios";

const topAnime = async (page) => {
  try {
    const fetchData = await axios.get(
      `https://api.jikan.moe/v4/top/anime?page=${page}`
    );
    console.log("run fetch top anime");

    return fetchData.data;
  } catch (err) {
    throw new Error("fail get api data: ", err);
  }
};

export default topAnime;
