import Main from "../components/Main";
import List from "../components/List";

function HomePage() {
  return (
    <>
      <Main />
      <List title="Movie Trending" axiosURL="movie" />
      <List title="TV Series Trending" axiosURL="tv" />
      <List title="Person Trending" axiosURL="person" />
    </>
  );
}

export default HomePage;
