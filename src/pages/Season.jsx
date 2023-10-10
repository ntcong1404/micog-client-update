import { useParams } from "react-router-dom";
import * as Service from "../apiService/Service";
import { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { noImage } from "../assets";

function SeasonPage() {
  const { id, number } = useParams();
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState([]);
  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
    Service.Season({ id: id, number: number })
      .then((res) => {
        setSeason(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id, number]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full flex-col ">
          <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
          <p className="my-4 py-2 text-base text-slate-400">
            fetching data ...
          </p>
        </div>
      ) : (
        <div className="mb-6 mt-[1px]">
          <div className="bg-gradient-to-r from-slate-900 to-neutral-700 px-6 py-4 ">
            <div className="grid grid-cols-9 gap-8 items-center">
              <img
                className="col-span-1 w-full h-auto object-cover rounded-md"
                src={
                  season?.poster_path
                    ? `https://image.tmdb.org/t/p/original/${season?.poster_path}`
                    : noImage
                }
                alt={season?.name}
              />

              <div className="col-span-8">
                <p className="text-4xl text-slate-50 font-bold py-2 my-1">
                  {season?.name}
                </p>
                <p className="text-sm text-slate-400 px-1">
                  {season?.air_date}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="text-2xl font-bold my-2 py-2">{`Episodes ${season?.episodes?.length}`}</div>
            <div>
              {season?.episodes?.map((epi, index) => (
                <div
                  key={index}
                  className="grid grid-cols-8 gap-4 my-4 border border-slate-100 rounded-md shadow shadow-slate-300"
                >
                  <img
                    className="col-span-2 w-full h-auto rounded-l-md"
                    src={
                      epi?.still_path
                        ? `https://image.tmdb.org/t/p/original/${epi?.still_path}`
                        : noImage
                    }
                    alt={epi?.name}
                  />
                  <div className="col-span-6 ">
                    <div className="flex text-xl font-bold my-4">
                      <p>{epi?.episode_number}</p>.
                      <div className="mx-4">
                        <p>{epi?.name}</p>
                        <p className="text-sm font-medium px-1">
                          {epi?.air_date}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm px-4">{epi?.overview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeasonPage;
