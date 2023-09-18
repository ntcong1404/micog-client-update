import { useParams } from "react-router-dom";
import PersonDetail from "../components/PersonDetail";
import MovieAndTvDetail from "../components/MovieAndTvDetail";

function DetailsPage() {
  const { slug, id } = useParams();

  return (
    <>
      {slug === "person" ? (
        <PersonDetail slug={slug} id={id} />
      ) : (
        <MovieAndTvDetail slug={slug} id={id} />
      )}
    </>
  );
}

export default DetailsPage;
