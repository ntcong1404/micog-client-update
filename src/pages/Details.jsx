import { useParams } from "react-router-dom";
import PersonDetail from "../components/PersonDetail";
import MovieDetail from "../components/MovieDetail";
import TvDetail from "../components/TvDetail";

function DetailsPage() {
  const { slug, id } = useParams();

  return (
    <>
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
