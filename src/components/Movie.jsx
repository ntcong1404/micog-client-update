import { useNavigate } from "react-router-dom";
import { noImage } from "../assets";

const Movie = ({ list, item, type }) => {
  const navigate = useNavigate();
  var rate = Math.round((item?.vote_average + Number.EPSILON) * 10) / 10;

  const handlePlay = (type, id) => {
    navigate(`/details/${type}/${id}`);
  };

  return (
    <>
      {list ? (
        <div
          onClick={() => handlePlay(item?.media_type, item?.id)}
          className="w-[350px] h-[230px] inline-block cursor-pointer relative p-2  hover:scale-105 "
        >
          <img
            className="w-full h-full shadow-lg shadow-blue-400/70 block rounded-lg object-cover "
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500/${
              item?.backdrop_path ? item.backdrop_path : item.profile_path
            }`}
            alt={item?.title ? item.title : item.original_name}
          />
          {item?.media_type === "person" ? (
            ""
          ) : (
            <div className=" absolute bottom-[10px] left-4 w-[30px] h-[30px] flex items-center justify-center rounded-full bg-slate-900 shadow shadow-sky-500">
              <p
                className={
                  `font-semibold text-sm ` +
                  `${
                    rate > 7
                      ? `text-green-400`
                      : 7 > rate > 5
                      ? `text-orange-500`
                      : `text-red-600`
                  }`
                }
              >
                {rate}
              </p>
            </div>
          )}
          <p className=" text-sm font-bold text-center py-4 w-full ">
            {item?.title ? item.title : item.original_name}
          </p>
        </div>
      ) : (
        <div
          onClick={() => handlePlay(type, item?.id)}
          className=" w-full h-full mb-2 rounded-md border border-slate-200  cursor-pointer relative group overflow-hidden "
        >
          <img
            className="w-full h-auto mb-2 shadow-lg shadow-blue-400/70 block rounded-t-md object-cover group-hover:scale-[101%] "
            loading="lazy"
            src={
              item?.backdrop_path || item?.profile_path
                ? `https://image.tmdb.org/t/p/w500/${
                    item?.backdrop_path ? item.backdrop_path : item.profile_path
                  }`
                : noImage
            }
            alt={item?.title ? item.title : item.original_name}
          />
          {item?.media_type === "person" ? (
            ""
          ) : (
            <div className=" absolute bottom-[62px] left-2 w-[30px] h-[30px] flex items-center justify-center rounded-full bg-slate-900 shadow shadow-sky-500">
              <p
                className={
                  `font-semibold text-sm ` +
                  `${
                    rate > 7
                      ? `text-green-400`
                      : 7 > rate > 5
                      ? `text-orange-500`
                      : `text-red-600`
                  }`
                }
              >
                {rate}
              </p>
            </div>
          )}
          <p className="py-2 mt-4 text-sm font-bold text-center group-hover:text-sky-500">
            {item?.title ? item.title : item.original_name}
          </p>
        </div>
      )}
    </>
  );
};

export default Movie;
