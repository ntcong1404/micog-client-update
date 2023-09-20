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

function GenrePage() {
  const { slug, id, genre } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState(slug);
  const [loading, setLoading] = useState(true);

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };
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
      <div className="flex items-center justify-between px-14 text-2xl font-bold text-gray-500 bg-results w-full h-[70px] bg-slate-800">
        <p className="text-white">{genre}</p>
        <p className="text-xl">
          {type === "tv"
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
              <div className="">
                {movies?.results?.map((movie, index) => (
                  <div
                    key={index}
                    className=" mb-3 rounded-md overflow-hidden bg-gradient-to-r from-slate-100 to-sky-100 cursor-pointer hover:bg-gradient-to-r hover:from-sky-200 hover:to-slate-100 "
                    onClick={() => handleClick(movie?.id)}
                  >
                    <div className=" flex items-center ">
                      <div>
                        <div className="w-[160px] h-auto mr-4">
                          <img
                            loading="lazy"
                            className="w-full h-full object-cover rounded-l-md "
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
                      </div>

                      <div className="ml-4 p-4">
                        <div className="wrapper">
                          <div className="title">
                            <div>
                              <h2 className="text-2xl font-bold ">
                                {movie.original_title
                                  ? movie.original_title
                                  : movie.original_name}
                              </h2>
                            </div>

                            <span className="text-sm font-medium text-gray-500 ">
                              {movie.known_for
                                ? movie.known_for.first_air_date
                                : movie.release_date}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 text-sm h-[100px] overflow-y-auto">
                          <p>
                            {movie.known_for
                              ? movie.known_for.overview
                              : movie.overview}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-center">
              {movies?.page === 1 ? (
                <></>
              ) : (
                <button
                  onClick={handlePrevPage}
                  className="flex items-center justify-center mt-7 p-2 text-base font-medium hover:bg-sky-100 border border-slate-300 rounded-md"
                >
                  <FontAwesomeIcon
                    className="text-xs font-medium mr-2"
                    icon={faChevronLeft}
                  />
                  Prev
                </button>
              )}
              <div
                onClick={handleNextPage}
                className=" mx-7 mt-7 p-2 text-base font-bold border border-slate-300 rounded-md"
              >
                {`Page ${movies?.page}`}
              </div>
              {page < movies?.total_pages ? (
                <button
                  onClick={handleNextPage}
                  className="flex items-center justify-center mt-7 p-2 text-base font-medium hover:bg-sky-100 border border-slate-300 rounded-md"
                >
                  Next
                  <FontAwesomeIcon
                    className="text-xs font-medium ml-2"
                    icon={faChevronRight}
                  />
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default GenrePage;
