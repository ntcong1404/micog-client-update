import Main from "../components/main";
import List from "../components/List";

function HomePage() {
  return (
    <>
      <Main />
      <List rowID="1" title="Movie Trending" axiosURL="movie" />
      <List rowID="2" title="TV Series Trending" axiosURL="tv" />
      <List rowID="3" title="Person Trending" axiosURL="person" />
    </>
  );
}

export default HomePage;
