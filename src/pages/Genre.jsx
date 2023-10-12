import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Service from "../apiService/Service";
import PuffLoader from "react-spinners/PuffLoader";
import Movie from "../components/Movie";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet";

function GenrePage() {
  const { slug, id, genre } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState(slug);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
    Service.Discover({ item: type, genres: id, page: page })
      .then((res) => {
        setMovies(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id, type, page]);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Genre - M I C O G</title>
        <meta name="genre page" content="genre of a movie or a TV show" />
      </Helmet>
      <div className="flex items-center justify-between px-14 text-2xl font-bold text-gray-500 bg-results w-full h-[120px] bg-slate-800">
        <p className="text-white text-3xl">{genre}</p>
        <p>
          {type === "tvc"
            ? `${movies?.total_results} shows`
            : `${movies?.total_results} movies`}
        </p>
      </div>
      <div>
        <div className="flex justify-end my-4 text-2xl font-bold py-2 border-b-[1px] border-slate-200">
          <div
            onClick={() => setType("movie")}
            className={`${
              type === "movie"
                ? "border-b-2 border-red-600 px-2 mx-4 cursor-pointer hover:text-red-700"
                : "px-2 mx-4 cursor-pointer hover:text-red-700"
            }`}
          >
            Movies
          </div>
          <div
            onClick={() => setType("tv")}
            className={`${
              type === "tv"
                ? "border-b-2 border-red-600 px-2 mx-4 cursor-pointer hover:text-red-700"
                : "px-2 mx-4 cursor-pointer hover:text-red-700"
            }`}
          >
            TV Series
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full flex-col ">
          <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
          <p className="my-4 py-2 text-base text-slate-400">
            fetching data ...
          </p>
        </div>
      ) : (
        <>
          <div className="px-6 my-6 ">
            <Movie genre item={movies} type={type} />
            <Pagination page={page} setPage={setPage} data={movies} />
          </div>
        </>
      )}
    </>
  );
}

export default GenrePage;
