import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Service from "../apiService/Service";
import TableFilter from "../components/TableFilter";
import Movie from "../components/Movie";
import PuffLoader from "react-spinners/PuffLoader";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet-async";

const lists = [
  { title: "Popular", fetch: "popular" },
  { title: "Airing today", fetch: "airing_today" },
  { title: "On TV", fetch: "on_the_air" },
  { title: "Top rated", fetch: "top_rated" },
];
function TvPage() {
  const { slug } = useParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Service.Genres({ item: "tv" })
      .then((res) => {
        setGenres(res.genres);
      })
      .catch((err) => console.log(err));
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
    Service.Discover({ item: "tv", genres: slug, page: page })
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
        <title>TV Shows - M I C O G</title>
        <meta name="tv shows page" content="all TV shows with genres" />
      </Helmet>
      <div className="grid grid-cols-6  gap-4 px-6 my-6 ">
        <div className="col-span-1 ">
          <TableFilter type="tv" lists={lists} genres={genres} />
        </div>
        <div className="col-span-5 flex flex-col">
          {loading ? (
            <div className="flex justify-center items-center h-screen w-full flex-col ">
              <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
              <p className="my-4 py-2 text-base text-slate-400">tv shows ...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 justify-items-center">
                {movies?.results?.map((movie, index) => (
                  <Movie key={index} item={movie} type="tv" />
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

export default TvPage;
