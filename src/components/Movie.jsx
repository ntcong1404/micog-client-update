import { useNavigate } from "react-router-dom";
import { noImage } from "../assets";
import Like from "./Like";

const Movie = ({ list, item, type }) => {
  const navigate = useNavigate();
  var rate = Math.round((item?.vote_average + Number.EPSILON) * 10) / 10;
  const handlePlay = (type, id) => {
    navigate(`/details/${type}/${id}`);
  };
  return (
    <>
      {list ? (
        <div className="w-[350px] relative p-2 ">
          <img
            onClick={() => handlePlay(item?.media_type, item?.id)}
            className="w-full h-full cursor-pointer block rounded-lg object-cover hover:scale-105  "
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
            <>
              <div className=" absolute bottom-12 left-4">
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
          <p className=" text-sm font-bold text-center py-4 w-full ">
            {item?.title ? item.title : item.original_name}
          </p>
        </div>
      ) : (
        <div className="relative">
          <div
            onClick={() => handlePlay(type, item?.id)}
            className=" w-full h-full mb-2 rounded-md cursor-pointer relative overflow-hidden shadow-md shadow-slate-300 hover:translate-y-[-4px] hover:shadow-md hover:shadow-slate-400 "
          >
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
            <p className="py-1 mt-4 text-sm h-[54px] overflow-hidden font-bold text-center group-hover:text-sky-500">
              {item?.title ? item.title : item.original_name}
            </p>
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
