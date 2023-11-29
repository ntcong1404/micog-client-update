import * as Service from "../apiService/Service";
import { useEffect, useState } from "react";
import { noImage } from "../assets/index";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function PlayerTv({ detail, id }) {
  const number = detail?.last_episode_to_air?.season_number;

  const [season, setSeason] = useState([]);
  const [active, setActive] = useState();
  const [keyword, setKeyword] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
    Service.Season({
      item: "tv",
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: false,
    pauseOnDotsHover: true,
    slidesToShow: 3,
    variableWidth: true,
    pauseOnHover: true,
  };

  return (
    <>
      <div className="my-6 col-span-8">
        <iframe
          title={detail?.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          width="100%"
          height="560px"
          // src={` https://www.2embed.cc/embedtv/${id}&s=${detail?.last_episode_to_air?.season_number}&e=${active}`}
          src={` https://autoembed.to/tv/tmdb/${id}-${detail?.last_episode_to_air?.season_number}-${active}`}
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
              <a
                href={`/genre/${genre.id}/${genre.name}/tv`}
                key={index}
                className="mr-3 my-1 py-1 px-2 cursor-pointer hover:bg-slate-300 rounded-3xl bg-slate-200"
              >
                {genre.name}
              </a>
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
              <a
                href={`/keyword/${key?.id}/${key?.name}/tv`}
                key={index}
                className=" m-1 py-[3px] px-[6px] text-sm hover:bg-slate-300 rounded-3xl border border-slate-300 cursor-pointer"
              >
                {key?.name}
              </a>
            ))}
          </div>
        </div>
        <div className="mb-2 text-sm text-gray-600">
          <span className="mr-2 text-black font-semibold">Season : </span>
          <span className="py-1 mr-6 text-sm font-normal text-slate-700">
            {detail?.last_episode_to_air?.season_number}
          </span>
          <span className="mx-2  text-black font-semibold">Episode : </span>
          <span className="py-1 text-sm font-normal text-slate-700">
            {active}
          </span>
        </div>
      </div>
      <div className="col-span-12 my-6 py-4 border-t-[2px] border-slate-200">
        <h2 className="text-2xl font-semibold pt-2 pb-4">{`Season ${detail?.last_episode_to_air?.season_number}`}</h2>
        <Slider {...settings}>
          {season?.episodes?.map((epi, index) => (
            <div key={index} className="px-2">
              <div
                onClick={() => setActive(epi.episode_number)}
                className={`relative cursor-pointer rounded-md shadow-md shadow-slate-300 hover:translate-y-[-4px] hover:shadow-md hover:shadow-slate-400  ${
                  active === epi.episode_number ? "shadow-slate-400" : ""
                }`}
              >
                <div className="w-[350px] h-auto">
                  <img
                    src={
                      epi?.still_path
                        ? `https://image.tmdb.org/t/p/original/${epi?.still_path}`
                        : noImage
                    }
                    className="w-full h-auto cursor-pointer rounded-t-lg object-cover "
                  />
                </div>
                <div className="text-center py-4 px-2 ">
                  <p className="text-black text-sm py-1">{`Episode ${epi.episode_number}`}</p>
                  <p className="text-black font-semibold p-2 ">{epi.name}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default PlayerTv;
