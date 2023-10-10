import { useNavigate } from "react-router-dom";
import * as Service from "../apiService/Service";
import { useEffect, useState } from "react";
import { noImage } from "../assets/index";

function PlayerTv({ detail, id }) {
  const navigate = useNavigate();
  const number = detail?.last_episode_to_air?.season_number;

  const [season, setSeason] = useState([]);
  const [active, setActive] = useState();
  const [keyword, setKeyword] = useState([]);
  console.log(keyword);

  const handleClickGenre = (id, name) => {
    navigate(`/genre/${id}/${name}/tv`);
  };
  const handleClickKeyword = (id, name) => {
    navigate(`/keyword/${id}/${name}/tv`);
  };

  useEffect(() => {
    window.scroll(0, 0);
    Service.Season({
      id: id,
      number: number,
    })
      .then((res) => {
        setSeason(res);
        setActive(detail?.last_episode_to_air?.episode_number);
      })
      .catch((err) => console.log(err));
    Service.DetailsOptions({
      type: "tv",
      id: id,
      option: "keywords",
      page: 1,
    })
      .then((res) => {
        setKeyword(res?.results);
      })
      .catch((err) => console.log(err));
  }, [id, number, detail]);

  return (
    <>
      <div className="my-6 col-span-8">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          width="100%"
          height="560px"
          src={`https://embed.smashystream.com/playere.php?tmdb=${id}&season=${detail?.last_episode_to_air?.season_number}&episode=${active}`}
        ></iframe>
      </div>
      <div className="text-3xl font-bold py-2 my-4 col-span-4 ">
        <h2 className="text-center">{detail?.name}</h2>
        <p className="py-2 text-center text-base text-gray-600 ">
          {detail?.tagline}
        </p>
        <div className=" my-4 text-sm text-gray-600 ">
          <p className="mr-6 text-black font-semibold">Gernres </p>
          <div className="flex flex-wrap my-2">
            {detail?.genres?.map((genre, index) => (
              <p
                onClick={() => handleClickGenre(genre.id, genre.name)}
                key={index}
                className="mr-3 my-1 py-1 px-2 cursor-pointer hover:bg-slate-300 rounded-3xl bg-slate-200"
              >
                {genre.name}
              </p>
            ))}
          </div>
        </div>
        <div className="mb-2 text-sm text-gray-600">
          <p className="mr-6 text-black font-semibold">Overview</p>
          <p className="py-1 text-base font-normal text-slate-700">
            {detail?.overview}
          </p>
        </div>
        <div className="mb-2 text-sm text-gray-600">
          <p className="mr-6 text-black font-semibold">First air date</p>
          <p className="py-1 text-base font-normal text-slate-700">
            {detail?.first_air_date}
          </p>
        </div>
        <div className=" my-4 text-sm text-gray-600 ">
          <p className="mr-6 text-black">Keywords </p>
          <div className="flex flex-wrap my-2">
            {keyword?.map((key, index) => (
              <p
                onClick={() => handleClickKeyword(key?.id, key?.name)}
                key={index}
                className=" m-1 py-[3px] px-[6px] text-sm hover:bg-slate-300 rounded-3xl border border-slate-300 cursor-pointer"
              >
                {key?.name}
              </p>
            ))}
          </div>
        </div>
        <div className="mb-2 text-sm text-gray-600">
          <span className="mr-3 text-black font-semibold">Season : </span>
          <span className="py-1 text-base font-normal text-slate-700">
            {detail?.last_episode_to_air?.season_number}
          </span>
          <span className="mx-3 text-black font-semibold">Episode : </span>
          <span className="py-1 text-base font-normal text-slate-700">
            {active}
          </span>
        </div>
      </div>
      <div className="col-span-12">
        <div>
          <div className=" my-4 text-3xl font-bold ">{`Season ${detail?.last_episode_to_air?.season_number}`}</div>
          <div className=" py-2 flex items-center overflow-x-auto border-b-2 border-slate-200 ">
            {season?.episodes?.map((epi, index) => (
              <div
                onClick={() => setActive(epi.episode_number)}
                key={index}
                className={`relative flex flex-col text-center mr-4 mb-6 cursor-pointer rounded-md shadow-md shadow-slate-300 hover:translate-y-[-4px] hover:shadow-md hover:shadow-slate-400  ${
                  active === epi.episode_number ? "shadow-slate-400" : ""
                }`}
              >
                <div className="w-[240px] h-full ">
                  <img
                    src={
                      epi?.still_path
                        ? `https://image.tmdb.org/t/p/original/${epi?.still_path}`
                        : noImage
                    }
                    className="w-full h-full rounded-t-md "
                    loading="lazy"
                  />
                </div>
                <div className="w-[240px] h-[100px] overflow-auto">
                  <p className="text-black text-sm py-1">{`Episode ${epi.episode_number}`}</p>
                  <p className="text-black font-semibold p-2 ">{epi.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerTv;
