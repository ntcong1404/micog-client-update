import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Service from "../apiService/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import PuffLoader from "react-spinners/PuffLoader";
import { noImage } from "../assets";
import Pagination from "../components/Pagination";

function GenrePage() {
  const { slug, id, genre } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState(slug);
  const [loading, setLoading] = useState(true);

  const handleClick = (id) => {
    navigate(`/details/${type}/${id}`);
  };
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
            {movies?.results?.length === 0 ? (
              <>
                {type === "movie" ? (
                  <p>No movies found.</p>
                ) : (
                  <p>No TV shows found.</p>
                )}
              </>
            ) : (
              <div className="grid grid-cols-5 gap-4">
                {movies?.results?.map((movie, index) => (
                  <div
                    key={index}
                    className=" mb-3 rounded-md overflow-hidden shadow-md shadow-slate-300 cursor-pointer hover:translate-y-[-4px] hover:shadow-md hover:shadow-slate-400 "
                    onClick={() => handleClick(movie?.id)}
                  >
                    <div className=" flex flex-col items-center ">
                      <div className="w-full h-auto">
                        <img
                          loading="lazy"
                          className="w-full h-full object-cover rounded-t-md "
                          src={
                            movie.poster_path || movie.profile_path
                              ? `https://image.tmdb.org/t/p/w500/${
                                  movie.poster_path
                                    ? movie.poster_path
                                    : movie.profile_path
                                }`
                              : noImage
                          }
                        />
                      </div>

                      <div className="p-2 m-2">
                        <h2 className="text-lg font-bold text-center">
                          {movie.title ? movie.title : movie.original_name}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Pagination page={page} setPage={setPage} data={movies} />
          </div>
        </>
      )}
    </>
  );
}

export default GenrePage;
