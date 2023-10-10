const routes = {
  home: "/",
  account: "/account/:slug",
  signup: "/signup",
  login: "/login",
  movie: "/movie/:slug",
  tv: "/tv/:slug",
  person: "/person/:slug",
  search: "/search/:query",
  details: "/details/:slug/:id",
  player: "/player/:slug/:id",
  genre: "/genre/:id/:genre/:slug",
  keyword: "/keyword/:id/:keyword/:slug",
  collection: "/collection/:id/:slug",
  season: "/tv/:id/season/:number",
  error: "/error",
};
export default routes;
