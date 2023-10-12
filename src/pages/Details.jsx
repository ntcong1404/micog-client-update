import { useParams } from "react-router-dom";
import PersonDetail from "../components/PersonDetail";
import MovieDetail from "../components/MovieDetail";
import TvDetail from "../components/TvDetail";
import { Helmet } from "react-helmet";

function DetailsPage() {
  const { slug, id } = useParams();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Detail - M I C O G</title>
        <meta
          name="detail page"
          content="details of a movie, a TV show, or a person"
        />
      </Helmet>
      {slug === "person" ? (
        <PersonDetail id={id} />
      ) : slug === "movie" ? (
        <MovieDetail id={id} />
      ) : (
        <TvDetail id={id} />
      )}
    </>
  );
}

export default DetailsPage;
