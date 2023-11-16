import dayjs from "dayjs";
import { noImage } from "../assets";
import Like from "./Like";

const Movie = ({ list, genre, item, type }) => {
  var rate = Math.round((item?.vote_average + Number.EPSILON) * 10) / 10;

  return (
    <>
      {list ? (
        <div className="w-[350px] p-2 ">
          <div className="relative">
            <a href={`/details/${item?.media_type}/${item?.id}`}>
              <img
                className="w-full h-auto cursor-pointer block rounded-lg object-cover hover:scale-[102%]"
                loading="lazy"
                src={
                  item?.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                    : item.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                    : noImage
                }
                alt={item?.title ? item.title : item.original_name}
              />
            </a>
            {item?.media_type === "person" ? (
              ""
            ) : (
              <>
                <div className=" absolute bottom-[-12px] left-[10px]">
                  <div className="flex items-center justify-center overflow-hidden bg-slate-900 rounded-full">
                    <svg
                      className="w-10 h-10 transform translate-x-1 translate-y-1"
                      aria-hidden="true"
                    >
                      <circle
                        className="text-gray-300"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="transparent"
                        r="15"
                        cx="16"
                        cy="16"
                      />
                      <circle
                        className={
                          `font-semibold text-sm ` +
                          `${
                            rate <= 5
                              ? `text-red-400`
                              : 7 >= rate
                              ? `text-orange-600`
                              : 10 >= rate
                              ? `text-green-500`
                              : ""
                          }`
                        }
                        strokeWidth="2"
                        strokeDasharray={18 * 2 * Math.PI}
                        strokeDashoffset={
                          18 * 2 * Math.PI - (rate / 10) * (18 * 2 * Math.PI)
                        }
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="15"
                        cx="16"
                        cy="16"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-semibold text-white">{`${
                      rate * 10
                    }%`}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Like slug={item.media_type} detail={item} />
                </div>
              </>
            )}
          </div>
          <p className=" text-sm font-bold text-center py-4 px-2 w-full ">
            {item?.title ? item.title : item.original_name}
          </p>
        </div>
      ) : genre ? (
        <>
          {item?.results?.length === 0 ? (
            <>
              {type === "movie" ? (
                <p>No movies found.</p>
              ) : (
                <p>No TV shows found.</p>
              )}
            </>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {item?.results?.map((movie, index) => (
                <a
                  key={index}
                  className=" mb-3 rounded-md overflow-hidden shadow-md shadow-slate-300 cursor-pointer hover:translate-y-[-4px] hover:shadow-md hover:shadow-slate-400 "
                  href={`/details/${type}/${movie?.id}`}
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
                      <h3 className="text-lg font-bold text-center">
                        {movie.title ? movie.title : movie.original_name}
                      </h3>
                      {movie.release_date ? (
                        <p className=" text-center text-slate-500 text-sm pt-2">
                          {dayjs(movie.release_date).format("MMMM YYYY")}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="relative">
          <div className=" w-full h-full mb-2 rounded-md cursor-pointer relative overflow-hidden shadow-md shadow-slate-300 hover:translate-y-[-4px] hover:shadow-md hover:shadow-slate-400 ">
            <a href={`/details/${type}/${item?.id}`}>
              <img
                className="w-full h-auto mb-2 block rounded-t-md object-cover shadow-md shadow-slate-300 "
                loading="lazy"
                src={
                  item?.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                    : item.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                    : noImage
                }
                alt={item?.title ? item.title : item.original_name}
              />
              {item?.media_type === "person" ? (
                ""
              ) : (
                <div className=" absolute bottom-[54px] left-2 ">
                  <div className="flex items-center justify-center overflow-hidden bg-slate-900 rounded-full">
                    <svg
                      className="w-10 h-10 transform translate-x-1 translate-y-1"
                      aria-hidden="true"
                    >
                      <circle
                        className="text-gray-300"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="transparent"
                        r="15"
                        cx="16"
                        cy="16"
                      />
                      <circle
                        className={
                          `font-semibold text-sm ` +
                          `${
                            rate <= 5
                              ? `text-red-400`
                              : 7 >= rate
                              ? `text-orange-600`
                              : 10 >= rate
                              ? `text-green-500`
                              : ""
                          }`
                        }
                        strokeWidth="2"
                        strokeDasharray={16 * 2 * Math.PI}
                        strokeDashoffset={
                          16 * 2 * Math.PI - (rate / 10) * (16 * 2 * Math.PI)
                        }
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="15"
                        cx="16"
                        cy="16"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-semibold text-white">{`${
                      rate * 10
                    }%`}</span>
                  </div>
                </div>
              )}
              <p className="py-1 px-4 mt-4 text-sm font-bold text-center group-hover:text-sky-500">
                {item?.title ? item.title : item.original_name}
              </p>
            </a>
          </div>
          <div className="absolute top-3 right-3">
            <Like slug={type} detail={item} />
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
