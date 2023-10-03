import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Service from "../apiService/Service";

import PlayerTv from "../components/PlayerTv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function PlayerPage() {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);
  const handleClickGenre = (id, name) => {
    navigate(`/genre/${id}/${name}/movie`);
  };
  const handleClickCollection = (id, name) => {
    navigate(`/collection/${id}/${name}`);
  };

  useEffect(() => {
    Service.Details({ type: slug, id: id })
      .then((res) => {
        setDetail(res);
      })
      .catch((err) => console.log(err));
  }, [slug, id]);

  return (
    <div className="px-6 py-4 grid grid-cols-12 gap-6">
      {slug === "movie" ? (
        <>
          <div className="my-6 col-span-8">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              width="100%"
              height="560px"
              src={`https://embed.smashystream.com/playere.php?tmdb=${id}`}
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
              <p className="py-1 font-normal text-slate-700">
                {detail?.overview}
              </p>
            </div>
            <div className="mb-2 text-sm text-gray-600">
              <p className="mr-6 text-black font-semibold">Release date</p>
              <p className="py-1 font-normal text-slate-700">
                {detail?.release_date}
              </p>
            </div>
            <div className=" my-4 text-sm text-gray-600 ">
              <p className="mr-6 text-black">Production companies </p>
              <div className="flex flex-wrap my-2">
                {detail?.production_companies?.map((com, index) => (
                  <p
                    key={index}
                    className="mr-3 my-1 font-normal text-slate-700 "
                  >
                    {com.name}
                  </p>
                ))}
              </div>
            </div>
            {detail?.belongs_to_collection ? (
              <div className="mb-2 text-sm text-gray-600">
                <p className="mr-6 text-black font-semibold">
                  Belongs to collection
                </p>
                <p
                  onClick={() =>
                    handleClickCollection(
                      detail?.belongs_to_collection?.id,
                      detail?.belongs_to_collection?.name
                    )
                  }
                  className="py-2 text-sm cursor-pointer text-slate-700 hover:text-slate-500 "
                >
                  {detail?.belongs_to_collection?.name}
                  <FontAwesomeIcon
                    className="mx-4 w-2 h-3"
                    icon={faArrowRight}
                  />
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : slug === "tv" ? (
        <PlayerTv detail={detail} id={id} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default PlayerPage;
