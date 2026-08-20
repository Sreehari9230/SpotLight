// import axios from "axios";
import * as cheerio from "cheerio";

export const getWatchlist = async (req, res) => {
  console.log("\n==============================");
  console.log("GET WATCHLIST STARTED");
  console.log("==============================");

  try {
    // 1. Check the incoming request
    console.log("1. Incoming request:");
    console.log("   URL:", req.originalUrl);
    console.log("   Query:", req.query);

    // 2. Get username
    const { username } = req.query;

    console.log("2. Username received:", username);

    if (!username) {
      console.log("ERROR: No username provided");

      return res.status(400).json({
        message: "Username is required",
      });
    }

    // 3. Clean username
    const cleanUsername = username.trim();

    console.log("3. Clean username:", cleanUsername);

    // 4. Create Letterboxd URL
    const url = `https://letterboxd.com/${cleanUsername}/watchlist/`;

    console.log("4. Letterboxd URL:");
    console.log("  ", url);

    // 5. Send request to Letterboxd
    console.log("5. Sending request to Letterboxd...");

    const response = await axios.get(url);

    console.log("6. Response received!");
    console.log("   Status:", response.status);
    console.log("   Status text:", response.statusText);

    // 6. Check HTML
    const html = response.data;

    console.log("7. HTML received");
    console.log("   HTML type:", typeof html);
    console.log("   HTML length:", html.length);

    // Uncomment this if you want to inspect the HTML
    // console.log(html);

    // 7. Load HTML into Cheerio
    console.log("8. Loading HTML into Cheerio...");

    const $ = cheerio.load(html);

    console.log("9. Cheerio loaded successfully");

    // 8. Find posters
    const posterCount = $(".poster-container").length;

    console.log("10. Poster containers found:", posterCount);

    if (posterCount === 0) {
      console.log("WARNING: No .poster-container elements found");
      console.log(
        "The Letterboxd HTML structure may have changed or the page may be blocked."
      );
    }

    // 9. Extract movies
    const movies = [];

    console.log("11. Starting movie extraction...");

    $(".poster-container").each((i, el) => {
      console.log(`\n--- Movie ${i + 1} ---`);

      const title = $(el).find("img").attr("alt");
      const link = $(el).find("a").attr("href");

      console.log("Title:", title);
      console.log("Link:", link);

      if (!title) {
        console.log("WARNING: Movie has no title");
      }

      if (!link) {
        console.log("WARNING: Movie has no link");
      }

      const movie = {
        title,
        link: link ? `https://letterboxd.com${link}` : null,
      };

      console.log("Movie object:", movie);

      movies.push(movie);
    });

    // 10. Final result
    console.log("\n12. Extraction finished");
    console.log("   Total movies:", movies.length);

    console.log("13. Movies:");
    console.log(movies);

    console.log("\n==============================");
    console.log("GET WATCHLIST SUCCESS");
    console.log("==============================\n");

    // 11. Send response
    return res.status(200).json({
      username: cleanUsername,
      count: movies.length,
      movies,
    });
  } catch (error) {
    console.log("\n==============================");
    console.log("GET WATCHLIST FAILED");
    console.log("==============================");

    console.log("ERROR MESSAGE:", error.message);

    console.log("ERROR NAME:", error.name);

    console.log("ERROR CODE:", error.code);

    if (error.response) {
      console.log("HTTP STATUS:", error.response.status);
      console.log("HTTP STATUS TEXT:", error.response.statusText);
      console.log("RESPONSE HEADERS:", error.response.headers);
    }

    if (error.request) {
      console.log("Request was sent but no response was received.");
    }

    console.log("FULL ERROR:");
    console.log(error);

    console.log("==============================\n");

    return res.status(500).json({
      message: "Failed to fetch Letterboxd watchlist",
      error: error.message,
    });
  }
};