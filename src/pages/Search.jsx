import { useState, useEffect } from "react";
import * as Service from "../apiService/Service";

import PuffLoader from "react-spinners/PuffLoader";
import { noImage } from "../assets";
import { Helmet } from "react-helmet-async";

const filter = [
  { title: "Movies", filter: "movie" },
  { title: "TV Shows", filter: "tv" },
  { title: "People", filter: "person" },
];

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handler);
  }, [value]);
  return debounceValue;
}
function SearchPage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [active, setActive] = useState(filter[0].filter);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    setLoading(true);
    Service.Search({ query: debouncedValue, page: page, filter: active })
      .then((res) => {
        if (res) {
          if (page > 1) setMovies((m) => [...m, ...res.results]);
          else setMovies([...res.results]);
        }

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [debouncedValue, page, active]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [active]);

  const handleChange = (e) => {
    const searchValue = e.target.value.trim();
    setSearchValue(searchValue);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };

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
        <div className="flex items-center justify-between px-14 bg-results w-full h-[120px] bg-slate-800">
          <form className="w-full py-1 rounded px-4 flex justify-evenly ">
            <input
              type="search"
              className="p-3 w-3/4 mr-2 text-xl font-semibold bg-slate-50 text-black rounded-md border border-slate-100 "
              placeholder="Search here..."
              onChange={handleChange}
            />
          </form>
        </div>
        <div>
          <div className="flex justify-center my-4 text-xl uppercase font-bold py-2 border-b-[1px] border-slate-200">
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
        <div className="p-6 mt-6 ">
          <div className="grid grid-cols-2 gap-6">
            {movies?.map((movie, index) => (
              <a
                href={`/details/${active}/${movie?.id}`}
                key={index}
                className=" mb-3 rounded-md overflow-hidden cursor-pointer shadow-md shadow-slate-300 hover:translate-y-[-4px] hover:shadow-md hover:shadow-slate-400 "
              >
                <div className=" flex items-center ">
                  <div>
                    <div className="w-[180px] h-[240px] mr-4">
                      <img
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
                            {movie.title ? movie.title : movie.original_name}
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

          <div className="flex items-center justify-center">
            {loading ? (
              <div className="flex justify-center items-center w-full flex-col mt-7">
                <PuffLoader color="gray" size={50} speedMultiplier={1.5} />
              </div>
            ) : (
              <>
                {movies.length > 0 && (
                  <button
                    onClick={handleNextPage}
                    className="w-full mt-7 px-2 py-3 text-md font-semibold hover:bg-slate-100 border border-slate-200 rounded"
                  >
                    Load more
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
