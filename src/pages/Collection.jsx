import { useState, useEffect } from "react";
import * as Service from "../apiService/Service";
import { useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";

function CollectionPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
    Service.Collections({ id: id })
      .then((res) => {
        setCollection(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{`${collection?.name} collection - M I C O G`}</title>
        <meta name="collection page" content="collection of any movie" />
      </Helmet>
      <div className="grid grid-cols-12 gap-7">
        {loading ? (
          <div className="flex justify-center items-center h-screen w-full flex-col col-span-12">
            <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
            <p className="my-4 py-2 text-base text-slate-400">
              fetching data ...
            </p>
          </div>
        ) : (
          <>
            <div className="col-span-12 relative">
              <img
                src={`https://image.tmdb.org/t/p/original/${collection?.backdrop_path}`}
                className=" w-full h-screen object-cover"
              />
              <div className="absolute top-0 left-0 right-0 text-center bg-gradient-to-b from-black to-transparent">
                {/* name movie */}
                <h3 className="text-4xl font-bold text-slate-100 py-6">
                  {collection?.name}
                </h3>
              </div>
            </div>

            <div className="col-span-12 px-6 my-4">
              <p className=" text-2xl font-semibold py-2 ">
                {`${collection?.parts?.length} movies`}
              </p>
              <div className="my-2 grid grid-cols-4 gap-6 ">
                {collection?.parts?.map((movie, index) => (
                  <a
                    key={index}
                    className="mb-3 flex flex-col items-center rounded-md overflow-hidden shadow-md shadow-slate-300 cursor-pointer hover:translate-y-[-4px] hover:shadow-md hover:shadow-slate-400"
                    href={`/details/movie/${movie?.id}`}
                  >
                    <div className="w-full h-auto">
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        className="w-full h-full object-cover rounded-t-md "
                        loading="lazy"
                      />
                    </div>
                    <div className=" p-2 my-2">
                      <h3 className="text-lg font-bold text-center">
                        {movie.title}
                      </h3>
                      {movie.release_date ? (
                        <p className=" text-center text-slate-500 text-sm pt-2">
                          {dayjs(movie.release_date).format("MMMM YYYY")}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CollectionPage;
