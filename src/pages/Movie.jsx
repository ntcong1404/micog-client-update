import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Service from "../apiService/Service";
import TableFilter from "../components/TableFilter";
import Movie from "../components/Movie";
import PuffLoader from "react-spinners/PuffLoader";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet-async";

const lists = [
  { title: "Now Playing", fetch: "now_playing" },
  { title: "Popular", fetch: "popular" },
  { title: "Top Rated", fetch: "top_rated" },
  { title: "Upcoming", fetch: "upcoming" },
];
function MoviePage() {
  const { slug } = useParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Service.Genres({ item: "movie" })
      .then((res) => {
        setGenres(res.genres);
      })
      .catch((err) => console.log(err));
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
    Service.Discover({ item: "movie", genres: slug, page: page })
      .then((res) => {
        setMovies(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [slug, page]);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Movies - M I C O G</title>
        <meta name="movies page" content="all movies with genres" />
      </Helmet>
      <div className="grid grid-cols-6 gap-4 px-6 my-6 ">
        <div className="col-span-1">
          <TableFilter type="movie" lists={lists} genres={genres} />
        </div>
        <div className="col-span-5 flex flex-col">
          {loading ? (
            <div className="flex justify-center items-center h-screen w-full flex-col ">
              <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
              <p className="my-4 py-2 text-base text-slate-400">movies ...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 justify-items-center">
                {movies?.results?.map((movie, index) => (
                  <Movie key={index} item={movie} type="movie" />
                ))}
              </div>
            </>
          )}
          <Pagination page={page} setPage={setPage} data={movies} />
        </div>
      </div>
    </>
  );
}

export default MoviePage;
