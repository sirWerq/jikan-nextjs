import axios from "axios";

const animeStaff = async (id) => {
  try {
    const fetchData = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/staff`
    );
    console.log("run fetch staff anime");
    return fetchData.data;
  } catch (err) {
    throw new Error("fail get api data: ", err);
  }
};

export default animeStaff;
