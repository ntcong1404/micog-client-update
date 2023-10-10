import * as request from "../utils/request";

export const Main = async () => {
  try {
    const res = await request.get("movie/now_playing", {
      params: {
        api_key: import.meta.env.VITE_APP_IMDB_API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const Trending = async ({ item, time }) => {
  try {
    const res = await request.get(`trending/${item}/${time}`, {
      params: {
        api_key: import.meta.env.VITE_APP_IMDB_API_KEY,
        language: "en-US",
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const Search = async ({ query, page, filter }) => {
  try {
    const res = await request.get(`search/${filter}`, {
      params: {
        api_key: import.meta.env.VITE_APP_IMDB_API_KEY,
        page,
        query: query,
        include_adult: "false",
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const Movie = async ({ item, page }) => {
  try {
    const res = await request.get(`movie/${item}`, {
      params: {
        api_key: import.meta.env.VITE_APP_IMDB_API_KEY,
        language: "en-US",
        page: page,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const Genres = async ({ item }) => {
  try {
    const res = await request.get(`genre/${item}/list`, {
      params: {
        api_key: import.meta.env.VITE_APP_IMDB_API_KEY,
        language: "en-US",
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const Discover = async ({ item, genres, keywords, page }) => {
  try {
    const res = await request.get(`discover/${item}`, {
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: page,
        with_genres: genres,
        with_keywords: keywords,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const TvSeries = async ({ item, page }) => {
  try {
    const res = await request.get(`tv/${item}`, {
      params: {
        api_key: import.meta.env.VITE_APP_IMDB_API_KEY,
        language: "en-US",
        page: page,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const People = async ({ item, page }) => {
  try {
    const res = await request.get(`person/${item}`, {
      params: {
        api_key: import.meta.env.VITE_APP_IMDB_API_KEY,
        language: "en-US",
        page: page,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const Details = async ({ type, id }) => {
  try {
    const res = await request.get(`${type}/${id}`, {
      params: {
        api_key: import.meta.env.VITE_APP_IMDB_API_KEY,
        language: "en-US",
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const DetailsOptions = async ({ type, id, option, page }) => {
  try {
    const res = await request.get(`${type}/${id}/${option}`, {
      params: {
        api_key: import.meta.env.VITE_APP_IMDB_API_KEY,
        language: "en-US",
        page,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const Collections = async ({ id }) => {
  try {
    const res = await request.get(`collection/${id}`, {
      params: {
        api_key: import.meta.env.VITE_APP_IMDB_API_KEY,
        language: "en-US",
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const Season = async ({ id, number }) => {
  try {
    const res = await request.get(`tv/${id}/season/${number}`, {
      params: {
        api_key: import.meta.env.VITE_APP_IMDB_API_KEY,
        language: "en-US",
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
