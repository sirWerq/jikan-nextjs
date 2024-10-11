import axios from "axios";

const topManga = async () => {
  try {
    const fetchData = await axios.get(
      `https://api.jikan.moe/v4/top/manga?limit=10`
    );
    console.log("run fetch top anime");

    return fetchData.data;
  } catch (err) {
    throw new Error("fail get api data: ", err);
  }
};

export default topManga;
