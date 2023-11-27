import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Service from "../apiService/Service";

import PuffLoader from "react-spinners/PuffLoader";
import { noImage } from "../assets";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet-async";

function PeoplePage() {
  const { slug } = useParams();

  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
    Service.People({ item: slug, page: page })
      .then((res) => {
        setPerson(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [slug, page]);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Person - M I C O G</title>
        <meta name="person page" content="all person" />
      </Helmet>
      <div className="mb-8">
        <p className="my-4 py-4 px-6 text-3xl font-bold">Popular People</p>
        {loading ? (
          <div className="flex justify-center items-center h-screen w-full flex-col ">
            <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
            <p className="my-4 py-2 text-base text-slate-400">persons ...</p>
          </div>
        ) : (
          <>
            <div className="px-6 grid grid-cols-5 gap-4">
              {person?.results?.map((item, index) => (
                <a
                  key={index}
                  className="w-full h-auto shadow-md shadow-slate-300 rounded-lg cursor-pointer relative mb-2 overflow-hidden hover:translate-y-[-4px] hover:shadow-md hover:shadow-slate-400 "
                  href={`/details/person/${item?.id}`}
                >
                  <img
                    className="w-full h-auto rounded-t-lg object-cover "
                    src={
                      item.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                        : noImage
                    }
                    alt={item.name}
                  />
                  <p className=" text-sm font-bold text-center py-5 ">
                    {item.name}
                  </p>
                </a>
              ))}
            </div>
          </>
        )}
        <Pagination page={page} setPage={setPage} data={person} />
      </div>
    </>
  );
}

export default PeoplePage;
