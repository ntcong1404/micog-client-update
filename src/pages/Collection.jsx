import { useState, useEffect } from "react";
import * as Service from "../apiService/Service";
import { useNavigate, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";

function CollectionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);

  const handleClickMovie = (id) => {
    navigate(`/details/movie/${id}`);
  };

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

          <div className="col-span-12 px-6">
            <p className=" text-2xl font-semibold py-2 ">
              {`${collection?.parts?.length} movies`}
            </p>
            <div className="my-2 grid grid-cols-4 gap-4 ">
              {collection?.parts?.map((movie, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center p-1 mb-2 cursor-pointer rounded-md group shadow-md shadow-slate-300"
                  onClick={() => handleClickMovie(movie?.id)}
                >
                  <div className="w-full h-[360px]">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      className="w-full h-full object-cover rounded-md mr-4"
                      loading="lazy"
                    />
                  </div>
                  <p className="p-2 text-center font-semibold">{movie.title}</p>
                  <div className="absolute top-0 left-0 right-0 bottom-0 translate-y-[-4px] rounded-md bg-black opacity-0 group-hover:opacity-100 group-hover:bg-opacity-[20%] group-hover:transition ease-in-out group-hover:translate-y-0"></div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CollectionPage;