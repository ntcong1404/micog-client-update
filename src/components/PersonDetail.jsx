import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Service from "../apiService/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PulseLoader from "react-spinners/PulseLoader";

function PersonDetail({ slug, id }) {
  const navigate = useNavigate();

  const [detail, setDetail] = useState([]);
  const [credits, setCredits] = useState([]);
  const [external, setExternal] = useState("");
  const [active, setActive] = useState("movie_credits");
  const [loading, setLoading] = useState(true);

  const handleClick = (id) => {
    navigate(`/details/${active === "movie_credits" ? "movie" : "tv"}/${id}`);
  };

  useEffect(() => {
    Service.Details({ type: slug, id: id })
      .then((res) => {
        setDetail(res);
      })
      .catch((err) => console.log(err));

    Service.DetailsOptions({
      type: slug,
      id: id,
      option: "external_ids",
    })
      .then((res) => {
        setExternal(res);
      })
      .catch((err) => console.log(err));
  }, [slug, id]);

  useEffect(() => {
    setLoading(true);
    Service.DetailsOptions({
      type: slug,
      id: id,
      option: active,
    })
      .then((res) => {
        setCredits(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [active, slug, id]);

  return (
    <div className="px-6 my-6">
      <div className="grid grid-cols-12 gap-8 bg-slate-50 bg-results">
        <div className="col-span-4">
          <div className="w-full h-auto">
            <img
              src={`https://image.tmdb.org/t/p/original/${detail?.profile_path}`}
              alt={detail?.name}
              className="w-full h-full rounded-md"
            />
          </div>
          <div className=" flex justify-evenly my-6">
            {external?.facebook_id ? (
              <a href={`https://www.facebook.com/${external?.facebook_id}`}>
                <FontAwesomeIcon
                  className="mr-3 pr-2 text-3xl hover:text-sky-600"
                  icon={faFacebook}
                />
              </a>
            ) : (
              <></>
            )}
            {external?.twitter_id ? (
              <a href={`https://twitter.com/${external?.twitter_id}`}>
                <FontAwesomeIcon
                  className="mr-3 pr-2 text-3xl hover:text-sky-600"
                  icon={faTwitter}
                />
              </a>
            ) : (
              <></>
            )}
            {external?.instagram_id ? (
              <a href={`https://www.instagram.com/${external?.instagram_id}`}>
                <FontAwesomeIcon
                  className="mr-3 pr-2 text-3xl hover:text-sky-600"
                  icon={faInstagram}
                />
              </a>
            ) : (
              <></>
            )}
            {external?.tiktok_id ? (
              <a href={`https://www.tiktok.com/${external?.tiktok_id}`}>
                <FontAwesomeIcon
                  className="mr-3 pr-2 text-3xl hover:text-sky-600"
                  icon={faTiktok}
                />
              </a>
            ) : (
              <></>
            )}
            {external?.youtube_id ? (
              <a href={`https://www.youtube.com/${external?.youtube_id}`}>
                <FontAwesomeIcon
                  className="mr-3 pr-2 text-3xl hover:text-sky-600 "
                  icon={faYoutube}
                />
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="col-span-8 ">
          <h2 className="text-4xl font-bold py-2">{detail?.name}</h2>
          <div className="my-2">
            <p className="py-4 text-xl font-semibold">Biography</p>
            <p>{detail?.biography}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 ">
          <div className="my-4">
            <p className="text-2xl font-bold my-2 py-2 border-b-[1px] border-slate-200">
              Personal Info
            </p>
            <div className="text-base font-semibold mb-4">
              Known For
              <p className="text-base font-medium pb-1 pl-2">
                {detail?.known_for_department}
              </p>
            </div>
            <div className="text-base font-semibold mb-4">
              Gender
              <p className="text-base font-medium pb-1 pl-2">
                {detail?.gender === 1
                  ? "Female"
                  : detail?.gender === 2
                  ? "Male"
                  : ""}
              </p>
            </div>
            <div className="text-base font-semibold mb-4">
              Birthday
              <p className="text-base font-medium pb-1 pl-2">
                {detail?.birthday}
              </p>
            </div>
            {detail?.deathday === null ? (
              <></>
            ) : (
              <div className="text-base font-semibold mb-4">
                Deathday
                <p className="text-base font-medium pb-1 pl-2">
                  {detail?.deathday}
                </p>
              </div>
            )}
            <div className="text-base font-semibold mb-4">
              Place of Birth
              <p className="text-base font-medium pb-1 pl-2">
                {detail?.place_of_birth}
              </p>
            </div>
            <div className="text-base font-semibold mb-4">
              Also Known As
              {detail?.also_known_as?.map((item, index) => (
                <p className="text-base font-medium pb-1 pl-2" key={index}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <div className="flex justify-end my-4 text-2xl font-bold py-2 border-b-[1px] border-slate-200">
            <div
              onClick={() => setActive("movie_credits")}
              className={`${
                active === "movie_credits"
                  ? "border-b-2 border-red-600 px-2 mx-4 cursor-pointer hover:text-red-700"
                  : "px-2 mx-4 cursor-pointer hover:text-red-700"
              }`}
            >
              Movies
            </div>
            <div
              onClick={() => setActive("tv_credits")}
              className={`${
                active === "tv_credits"
                  ? "border-b-2 border-red-600 px-2 mx-4 cursor-pointer hover:text-red-700"
                  : "px-2 mx-4 cursor-pointer hover:text-red-700"
              }`}
            >
              TV Series
            </div>
          </div>
          {loading ? (
            <div className="col-span-3 flex justify-center items-center h-screen w-full flex-col ">
              <PulseLoader color="gray" size={12} speedMultiplier={1.5} />
              <p className="my-4 py-2 text-base text-slate-400">
                fetching data ...
              </p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-base font-semibold mb-4">Acting</p>

                {credits?.cast?.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-2 mb-4 py-2 border-b-[1px] border-slate-200"
                  >
                    <div className="col-span-2">
                      {item.release_date
                        ? item.release_date
                        : item.first_air_date
                        ? item.first_air_date
                        : "_"}
                    </div>
                    <div className="col-span-1">
                      <FontAwesomeIcon className="" icon={faArrowRight} />
                    </div>
                    <div
                      onClick={() => handleClick(item.id)}
                      className="col-span-9 font-semibold cursor-pointer hover:text-sky-600"
                    >
                      {item.title ? item.title : item.name ? item.name : " "}
                      <div className="text-base font-medium ">
                        {item.episode_count
                          ? `(${item.episode_count} episodes)`
                          : ""}{" "}
                        as{" "}
                        {item.character
                          ? item.character
                          : item.original_name
                          ? item.original_name
                          : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-base font-semibold mb-4">Production</p>
                {credits?.crew?.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-2 mb-4 py-2 border-b-[1px] border-slate-200"
                  >
                    <div className="col-span-2">{item.release_date}</div>
                    <div className="col-span-1">
                      <FontAwesomeIcon className="" icon={faArrowRight} />
                    </div>
                    <div
                      onClick={() => handleClick(item.id)}
                      className="col-span-9 font-semibold cursor-pointer hover:text-sky-600"
                    >
                      {item.title}{" "}
                      <div className="text-base font-medium ">
                        ...{item.job}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonDetail;
