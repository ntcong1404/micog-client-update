import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Movie from "./Movie";
import * as Service from "../apiService/Service";

function PlayerMovie({ detail, id }) {
  const [recom, setRecom] = useState([]);
  const [keyword, setKeyword] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
    Service.DetailsOptions({
      type: "movie",
      id: id,
      option: "recommendations",
      page: 1,
    })
      .then((res) => {
        setRecom(res?.results);
      })
      .catch((err) => console.log(err));
    Service.DetailsOptions({
      type: "movie",
      id: id,
      option: "keywords",
      page: 1,
    })
      .then((res) => {
        setKeyword(res?.keywords);
      })
      .catch((err) => console.log(err));
  }, [id]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: true,
    pauseOnDotsHover: true,
    slidesToShow: 3,
    variableWidth: true,
    pauseOnHover: true,
  };

  return (
    <>
      <div className="my-6 col-span-8">
        <iframe
          title={detail?.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          width="100%"
          height="560px"
          // src={` https://www.2embed.cc/embed/${id}`}
          src={` https://autoembed.to/movie/tmdb/${id}`}
        ></iframe>
      </div>
      <div className="text-3xl font-bold py-2 my-4 col-span-4 ">
        <h2 className="text-center">{detail?.title}</h2>
        <p className="py-2 text-center text-base text-gray-600 ">
          {detail?.tagline}
        </p>
        <div className=" my-4 text-sm text-gray-600 ">
          <p className="mr-6 text-black font-semibold">Gernres </p>
          <div className="flex flex-wrap my-2">
            {detail?.genres?.map((genre, index) => (
              <a
                href={`/genre/${genre.id}/${genre.name}/movie`}
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
          <p className="py-1 font-normal text-slate-700">{detail?.overview}</p>
        </div>
        <div className="mb-2 text-sm text-gray-600">
          <p className="mr-6 text-black font-semibold">Release date</p>
          <p className="py-1 font-normal text-slate-700">
            {detail?.release_date}
          </p>
        </div>
        <div className=" my-4 text-sm text-gray-600 ">
          <p className="mr-6 text-black">Keywords </p>
          <div className="flex flex-wrap my-2">
            {keyword?.map((key, index) => (
              <a
                href={`/keyword/${key?.id}/${key?.name}/movie`}
                key={index}
                className=" m-1 py-[3px] px-[6px] text-sm hover:bg-slate-300 rounded-3xl border border-slate-300 cursor-pointer"
              >
                {key?.name}
              </a>
            ))}
          </div>
        </div>
        {detail?.belongs_to_collection ? (
          <div className="mb-2 text-sm text-gray-600">
            <p className="mr-6 mb-2 text-black font-semibold">
              Belongs to collection
            </p>
            <a
              href={`/collection/${detail?.belongs_to_collection?.id}/${detail?.belongs_to_collection?.name}`}
              className="py-2 text-sm cursor-pointer text-slate-700 hover:text-slate-500 "
            >
              {detail?.belongs_to_collection?.name}
              <FontAwesomeIcon className="mx-4 w-2 h-3" icon={faArrowRight} />
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
      {recom.length > 0 ? (
        <div className="col-span-12 my-6 py-4 border-t-[2px] border-slate-200">
          <div>
            <h2 className="text-2xl font-semibold pt-2 pb-4">
              Recommendations
            </h2>
            <Slider {...settings}>
              {recom?.map((item, id) => (
                <Movie key={id} item={item} list />
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default PlayerMovie;
