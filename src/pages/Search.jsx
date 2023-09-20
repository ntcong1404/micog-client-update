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

const filter = [
  { title: "Movies", filter: "movie" },
  { title: "TV Shows", filter: "tv" },
  { title: "People", filter: "person" },
];
function SearchPage() {
  const { query } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [active, setActive] = useState(filter[0].filter);
  const [loading, setLoading] = useState(true);

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleClick = (id) => {
    navigate(`/details/${active}/${id}`);
  };

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
    <div className="p-6 mt-6  ">
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1 ">
          <div className=" rounded-md border border-gray-300 ">
            <div className="">
              <p className="text-lg text-center rounded-t-md p-4 bg-slate-200 text-slate-950 font-semibold">
                {`${movies?.total_results} results ${active} for " ${query} "`}
              </p>
              <div className=" mt-[1px]">
                <ul className="settings panel with_counts bg-gradient-to-r from-sky-50 to-green-50">
                  {filter.map((item, index) => (
                    <li
                      onClick={() => setActive(item?.filter)}
                      key={index}
                      className={
                        `flex justify-between items-center px-4 py-2 cursor-pointer ` +
                        `${
                          active === item?.filter
                            ? "bg-gradient-to-r from-sky-300 to-green-100 hover:bg-slate-200"
                            : "hover:bg-slate-200"
                        }`
                      }
                    >
                      <p className="text-lg ">{item.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="col-span-3 flex justify-center items-center h-screen w-full flex-col ">
            <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
            <p className="my-4 py-2 text-base text-slate-400">
              fetching data ...
            </p>
          </div>
        ) : (
          <>
            <div className="col-span-3 ">
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
          </>
        )}
      </div>
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
  );
}

export default SearchPage;
