// import axios from "axios";
import cheerio from "cheerio";

export const getWatchlist = async (username) => {
  const url = `https://letterboxd.com/${username}/watchlist/`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const movies = [];

  $(".poster-container").each((i, el) => {
    const title = $(el).find("img").attr("alt");
    const link = $(el).find("a").attr("href");

    movies.push({
      title,
      link: `https://letterboxd.com${link}`,
    });
  });

  return movies;
};