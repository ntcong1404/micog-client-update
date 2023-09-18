import * as Service from "../apiService/Service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHeartCircleCheck,
//   faHeartCirclePlus,
// } from "@fortawesome/free-solid-svg-icons";
// import { UserAuth } from "../context/AuthContext";
// import { db } from "../firebase/firebase";
// import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import Like from "./Like";

function MovieAndTvDetail({ slug, id }) {
  // const { user } = UserAuth();
  const navigate = useNavigate();

  const [detail, setDetail] = useState([]);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [videos, setVideos] = useState([]);
  // const [likeLists, setLikeLists] = useState([]);

  // const movieID = doc(db, "users", `${user?.email}`);
  // const handleLike = async (id) => {
  //   if (user?.email) {
  //     if (
  //       likeLists?.find((item) => item.id === detail?.id)?.id === detail?.id
  //     ) {
  //       const result = likeLists?.filter((item) => item?.id !== id);
  //       await updateDoc(movieID, {
  //         likeLists: result,
  //       });
  //     } else {
  //       await updateDoc(movieID, {
  //         likeLists: arrayUnion({
  //           id: detail?.id,
  //           title: detail?.title ? detail?.title : detail?.name,
  //           img: detail?.backdrop_path
  //             ? detail?.backdrop_path
  //             : detail?.poster_path,
  //           type: slug,
  //         }),
  //       });
  //     }
  //   } else {
  //     alert("Please log in to save a movie");
  //   }
  // };

  const handlePlayer = (id) => {
    navigate(`/player/${slug}/${id}`);
  };
  const handleClickSimilar = (id) => {
    navigate(`/details/${slug}/${id}`);
  };
  const handleClickGenre = (id, name) => {
    navigate(`/genre/${id}/${name}/${slug}`);
  };
  const handleClickCast = (id) => {
    navigate(`/details/person/${id}`);
  };

  // useEffect(() => {
  //   onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
  //     setLikeLists(doc.data()?.likeLists);
  //   });
  // }, [user?.email]);

  useEffect(() => {
    Service.Details({ type: slug, id: id })
      .then((res) => {
        setDetail(res);
      })
      .catch((err) => console.log(err));
    Service.DetailsOptions({ type: slug, id: id, option: "credits" })
      .then((res) => {
        setCast(res?.cast);
      })
      .catch((err) => console.log(err));
    Service.DetailsOptions({
      type: slug,
      id: id,
      option: "similar",
      page: 1,
    })
      .then((res) => {
        setSimilar(res?.results);
      })
      .catch((err) => console.log(err));
    Service.DetailsOptions({
      type: slug,
      id: id,
      option: "videos",
      page: 1,
    })
      .then((res) => {
        setVideos(res?.results);
      })
      .catch((err) => console.log(err));
  }, [slug, id]);
  return (
    <div className="grid grid-cols-12 gap-7">
      <div className="col-span-12 relative">
        <img
          src={`https://image.tmdb.org/t/p/original/${detail?.backdrop_path}`}
          className="absolute top-0 bottom-0 left-0 right-0 w-full h-full "
        />
        <div className="flex max-w-md w-full overflow-hidden ">
          <div className="overflow-hidden relative duration-500 shadow-lg movie-item text-white movie-card">
            <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-r from-neutral-900 to-transparent "></div>
            <div className="relative z-10 px-10 pt-10 space-y-6 movie_info">
              <div className=" align-self-end w-full">
                <div className="h-20"></div>
                <div className="space-y-6 ">
                  <div className="flex flex-col py-2 space-y-2">
                    {/* button play trailer */}
                    <div
                      onClick={() => handlePlayer(detail?.id)}
                      className="relative mb-10 flex items-center cursor-pointer w-min p-1 text-center text-white bg-red-500 rounded-full hover:bg-red-700 group "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <div className="absolute w-[150px] transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-2xl font-bold text-white ">
                        {slug === "movie" ? "Play movie" : "Play show"}
                      </div>
                    </div>

                    <div className="flex items-center">
                      {/* name movie */}
                      <h3 className="text-3xl font-bold text-white mr-10">
                        {slug === "movie" ? detail?.title : detail?.name}
                      </h3>
                      {/* like */}
                      {/* <div
                        onClick={() => handleLike(detail?.id)}
                        className=" ml-10 text-white text-xl "
                      >
                        {likeLists?.find((item) => item.id === detail?.id)
                          ?.id === detail?.id ? (
                          <FontAwesomeIcon
                            icon={faHeartCircleCheck}
                            className=" p-2 cursor-pointer border border-slate-50 text-red-400 rounded-full"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faHeartCirclePlus}
                            className=" p-2 cursor-pointer border border-slate-50  rounded-full"
                          />
                        )}
                      </div> */}
                      <Like slug={slug} detail={detail} />
                    </div>

                    {/* genres */}
                    <div className="flex text-sm text-gray-400 ">
                      {detail?.genres?.map((genre, index) => (
                        <p
                          onClick={() => handleClickGenre(genre.id, genre.name)}
                          key={index}
                          className="mr-3 py-1 cursor-pointer hover:text-slate-200"
                        >
                          {genre.name}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row py-2 justify-between datos">
                    {slug === "movie" ? (
                      <>
                        <div className="flex flex-col ">
                          <div className="popularity">{detail?.popularity}</div>
                          <div className="text-sm text-gray-400">
                            Popularity
                          </div>
                        </div>
                        <div className="flex flex-col ">
                          <div className="release">{detail?.release_date}</div>
                          <div className="text-sm text-gray-400">
                            Release date
                          </div>
                        </div>
                        <div className="flex flex-col ">
                          <div className="release"> {detail?.runtime} min</div>
                          <div className="text-sm text-gray-400">Runtime</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col ">
                          <div className="popularity">{detail?.popularity}</div>
                          <div className="text-sm text-gray-400">
                            Popularity:
                          </div>
                        </div>
                        <div className="flex flex-col ">
                          <div className="release">
                            {" "}
                            {detail?.first_air_date}
                          </div>
                          <div className="text-sm text-gray-400">
                            First air date:
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col py-2 ">
                    <div className="text-sm text-gray-400 mb-2">Overview:</div>
                    <p className="text-xs text-gray-100 mb-6 h-[150px] overflow-y-auto">
                      {detail?.overview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-8 px-6">
        {videos?.length !== 0 ? (
          <div className=" border-b-2 border-slate-200 ">
            <div className="text-3xl font-bold ">Trailer</div>
            {videos?.map(
              (video, index) =>
                video.type === "Trailer" && (
                  <iframe
                    className="my-6"
                    key={index}
                    width="820"
                    height="515"
                    src={`https://www.youtube.com/embed/${video.key}?controls=1`}
                  ></iframe>
                )
            )}
          </div>
        ) : (
          <></>
        )}

        {/* Series Cast */}
        <div>
          <div className=" my-6 text-3xl font-bold ">Cast</div>
          <div className=" flex items-center overflow-x-auto border-b-2 border-slate-200 ">
            {cast?.map((cast, index) => (
              <div
                onClick={() => handleClickCast(cast.id)}
                key={index}
                className="relative flex flex-col text-center mr-2 mb-6 cursor-pointer group "
              >
                <div className="w-[140px] h-auto ">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                    className="w-full h-full rounded-md group-hover:blur-[2px]"
                    loading="lazy"
                  />
                </div>
                <div className="absolute hidden bottom-0 right-0 left-0 group-hover:block ">
                  <p className="text-sky-900 font-semibold ">{cast.name}</p>
                  <p className="text-sky-100">{cast.known_for_department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-4 px-6">
        <p className="text-center text-2xl font-semibold py-2 ">
          You May Also Like
        </p>
        <div className="my-2 grid grid-cols-2 gap-2 ">
          {similar?.map((movie, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-1 mb-2 cursor-pointer rounded-md group border-b-[1px] border-sky-100"
              onClick={() => handleClickSimilar(movie?.id)}
            >
              <div className="w-full h-[260px]">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  className="w-full h-full object-cover rounded-md mr-4 group-hover:scale-[102%]"
                  loading="lazy"
                />
              </div>
              <p className="group-hover:translate-y-1 p-2 text-center font-semibold">
                {slug === "movie" ? movie.title : movie.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieAndTvDetail;
