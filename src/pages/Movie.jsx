import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Service from "../apiService/Service";
import TableFilter from "../components/TableFilter";
import Movie from "../components/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import PuffLoader from "react-spinners/PuffLoader";

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

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };

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
    <div className="grid grid-cols-6 gap-4 px-6 my-6 ">
      <div className="col-span-1">
        <TableFilter type="movie" lists={lists} genres={genres} />
      </div>
      <div className="col-span-5 flex flex-col">
        {loading ? (
          <div className="flex justify-center items-center h-screen w-full flex-col ">
            <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
            <p className="my-4 py-2 text-base text-slate-400">
              fetching data ...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 justify-items-center">
              {movies?.results?.map((movie, index) => (
                <div key={index}>
                  <Movie item={movie} type="movie" />
                </div>
              ))}
            </div>
          </>
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
    </div>
  );
}

export default MoviePage;
