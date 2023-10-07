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
        <div className="w-[350px] h-[230px] inline-block relative p-3 ">
          <img
            onClick={() => handlePlay(item?.media_type, item?.id)}
            className="w-full h-full shadow-lg shadow-blue-400/70  cursor-pointer block rounded-lg object-cover hover:scale-105  "
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500/${
              item?.backdrop_path ? item.backdrop_path : item.profile_path
            }`}
            alt={item?.title ? item.title : item.original_name}
          />
          {item?.media_type === "person" ? (
            ""
          ) : (
            <>
              <div className=" absolute bottom-6 left-6">
                <div className="flex items-center justify-center overflow-hidden bg-slate-900 rounded-full">
                  <svg
                    className="w-12 h-12 transform translate-x-1 translate-y-1"
                    aria-hidden="true"
                  >
                    <circle
                      className="text-gray-300"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      r="18"
                      cx="20"
                      cy="20"
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
                      strokeWidth="3"
                      strokeDasharray={18 * 2 * Math.PI}
                      strokeDashoffset={
                        18 * 2 * Math.PI - (rate / 10) * (18 * 2 * Math.PI)
                      }
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="18"
                      cx="20"
                      cy="20"
                    />
                  </svg>
                  <span className="absolute text-xs font-semibold text-white">{`${
                    rate * 10
                  }%`}</span>
                </div>
              </div>
              <div className="absolute top-6 right-6">
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
              className="w-full h-auto mb-2 block rounded-t-md object-cover "
              loading="lazy"
              src={
                item?.backdrop_path || item?.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${
                      item?.backdrop_path
                        ? item.backdrop_path
                        : item.profile_path
                    }`
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
                    className="w-[44px] h-[44px] transform translate-x-1 translate-y-1"
                    aria-hidden="true"
                  >
                    <circle
                      className="text-gray-300"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
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
                      strokeWidth="3"
                      strokeDasharray={16 * 2 * Math.PI}
                      strokeDashoffset={
                        16 * 2 * Math.PI - (rate / 10) * (16 * 2 * Math.PI)
                      }
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
                    />
                  </svg>
                  <span className="absolute text-xs font-semibold text-white">{`${
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
