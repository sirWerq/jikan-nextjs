import axios from "axios";

const seasonNowAnime = async () => {
  try {
    const fetchData = await axios.get(
      `https://api.jikan.moe/v4/seasons/now?limit=24`
    );
    console.log("run fetch season anime");

    return fetchData.data;
  } catch (err) {
    throw new Error("fail get api data: ", err);
  }
};

export default seasonNowAnime;
