import publicClient from "./client/public.client";
import privateClient from "./client/private.client";

// Main, Trending, Search, Genres, Discover,
// Person, Details, DetailsOptions, Collection, Season API
export const Main = async () => {
  try {
    const res = await publicClient.get(`movie/main?page=1`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const Trending = async ({ item, time }) => {
  try {
    const res = await publicClient.get(`${item}/trending/${time}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const Search = async ({ item, query, page }) => {
  try {
    const res = await publicClient.get(
      `${item}/search?query=${query}&page=${page}`
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const Genres = async ({ item }) => {
  try {
    const res = await publicClient.get(`${item}/genres`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const Discover = async ({ item, genres, keywords, page }) => {
  try {
    const res = await publicClient.get(
      `${item}/discover?with_genres=${genres}&page=${page}&with_keywords=${keywords}`
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const People = async ({ type, page }) => {
  try {
    const res = await publicClient.get(`person/list/a/b/${type}?page=${page}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const Details = async ({ type, id }) => {
  try {
    const res = await privateClient.get(`${type}/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const DetailsOptions = async ({ type, id, option }) => {
  try {
    const res = await publicClient.get(`${type}/${id}/${option}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const Collections = async ({ item, id }) => {
  try {
    const res = await publicClient.get(`${item}/collection/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const Season = async ({ item, id, number }) => {
  try {
    const res = await publicClient.get(`${item}/season/${id}/${number}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

// User API
export const signIn = async ({ email, password }) => {
  try {
    const res = await publicClient.post("user/signin", {
      email,
      password,
    });
    return { res };
  } catch (err) {
    return { err };
  }
};
export const signUp = async ({ email, password, displayName }) => {
  try {
    const res = await publicClient.post("user/signup", {
      email,
      password,
      displayName,
    });

    return { res };
  } catch (err) {
    return { err };
  }
};
export const getInfo = async () => {
  try {
    const res = await privateClient.get("user/info");

    return { res };
  } catch (err) {
    return { err };
  }
};
export const profileUpdate = async ({ displayName, password, newPassword }) => {
  try {
    const res = await privateClient.put("user/update_profile", {
      displayName,
      password,
      newPassword,
    });

    return { res };
  } catch (err) {
    return { err };
  }
};

// favorites API
export const getFavorites = async () => {
  try {
    const res = await privateClient.get("user/favorites");
    return { res };
  } catch (err) {
    return { err };
  }
};
export const addFavorites = async ({
  type,
  mediaId,
  mediaTitle,
  mediaPoster,
}) => {
  try {
    const res = await privateClient.post("user/favorites", {
      type,
      mediaId,
      mediaTitle,
      mediaPoster,
    });

    return { res };
  } catch (err) {
    return { err };
  }
};
export const deleteFavorites = async ({ id }) => {
  try {
    const res = await privateClient.delete(`user/favorites/${id}`);

    return { res };
  } catch (err) {
    return { err };
  }
};

// list API
export const getLists = async () => {
  try {
    const res = await privateClient.get("user/lists");
    return { res };
  } catch (err) {
    return { err };
  }
};
export const addLists = async ({ title, description }) => {
  try {
    const res = await privateClient.post("user/lists", {
      title,
      description,
    });

    return { res };
  } catch (err) {
    return { err };
  }
};
export const deleteLists = async ({ id }) => {
  try {
    const res = await privateClient.delete(`user/lists/${id}`);

    return { res };
  } catch (err) {
    return { err };
  }
};

// Movie in list API
export const getMovieOfList = async ({ listId }) => {
  try {
    const res = await privateClient.get(`user/list_movie/${listId}`);
    return { res };
  } catch (err) {
    return { err };
  }
};
export const addMovieIntoList = async ({
  listId,
  type,
  mediaId,
  mediaTitle,
  mediaPoster,
}) => {
  try {
    const res = await privateClient.post(`user/list_movie/${listId}`, {
      type,
      mediaId,
      mediaTitle,
      mediaPoster,
    });

    return { res };
  } catch (err) {
    return { err };
  }
};
export const removeMovieInList = async ({ movieId, listId }) => {
  try {
    const res = await privateClient.delete(
      `user/list_movie/${movieId}/${listId}`
    );

    return { res };
  } catch (err) {
    return { err };
  }
};
