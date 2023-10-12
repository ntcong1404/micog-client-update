import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Service from "../apiService/Service";

import PuffLoader from "react-spinners/PuffLoader";
import { noImage } from "../assets";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet";

const filter = [
  { title: "Movies", filter: "movie" },
  { title: "TV Shows", filter: "tv" },
  { title: "People", filter: "person" },
];
function SearchPage() {
  const { query } = useParams();

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [active, setActive] = useState(filter[0].filter);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
    Service.Search({ query: query, page: page, filter: active })
      .then((res) => {
        setMovies(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [query, page, active]);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Search - M I C O G</title>
        <meta
          name="search page"
          content="Search for any movies, tv shows, or person "
        />
      </Helmet>
      <div className=" ">
        <div>
          <div className="flex items-center justify-between px-14 text-2xl font-bold text-gray-300 bg-results w-full h-[120px] bg-slate-800">
            <p className="text-white uppercase text-3xl">{active}</p>
            <p>{`${movies?.total_results} results for " ${query} "`}</p>
          </div>
          <div>
            <div className="flex justify-end my-4 text-2xl font-bold py-2 border-b-[1px] border-slate-200">
              {filter.map((item, index) => (
                <div
                  onClick={() => setActive(item?.filter)}
                  key={index}
                  className={`${
                    active === item?.filter
                      ? "border-b-2 border-red-600 px-2 mx-4 cursor-pointer hover:text-red-700"
                      : "px-2 mx-4 cursor-pointer hover:text-red-700"
                  }`}
                >
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 mt-6 ">
          {loading ? (
            <div className="flex justify-center items-center h-screen w-full flex-col ">
              <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
              <p className="my-4 py-2 text-base text-slate-400">
                fetching data ...
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6">
                {movies?.results?.map((movie, index) => (
                  <a
                    href={`/details/${active}/${movie?.id}`}
                    key={index}
                    className=" mb-3 rounded-md overflow-hidden cursor-pointer shadow-md shadow-slate-300 hover:translate-y-[-4px] hover:shadow-md hover:shadow-slate-400 "
                  >
                    <div className=" flex items-center ">
                      <div>
                        <div className="w-[180px] h-[240px] mr-4">
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
                                {movie.title
                                  ? movie.title
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

                        <div className="mt-4 text-sm h-[100px] overflow-hidden">
                          <p>
                            {movie.known_for
                              ? movie.known_for.overview
                              : movie.overview}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
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

export default SearchPage;
