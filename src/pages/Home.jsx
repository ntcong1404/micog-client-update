import Main from "../components/Main";
import List from "../components/List";
import { Helmet } from "react-helmet";

function HomePage() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Home - M I C O G</title>
        <meta name="home page" content="home page of website micog" />
      </Helmet>
      <Main />
      <List title="Movie Trending" axiosURL="movie" />
      <List title="TV Series Trending" axiosURL="tv" />
      <List title="Person Trending" axiosURL="person" />
    </>
  );
}

export default HomePage;
