import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserAuth } from "../context/AuthContext";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { LoadingSpin } from "./Loading";
import * as Service from "../apiService/Service";
import { lightBlue } from "../assets/index";

function ListsAcc() {
  const { user } = UserAuth();
  const [showModal, setShowModal] = useState(false);
  const [showModalList, setShowModalList] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [movieInList, setMovieInList] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Service.getLists()
      .then(({ res, err }) => {
        if (res) setLists(res);
        if (err) console.log(err);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreateList = async () => {
    if (user) {
      setLoading(true);
      const { res, err } = await Service.addLists({
        title: name,
        description: desc,
      });
      if (res) {
        setLists([...lists, res]);
        setLoading(false);
        setShowModal(false);
      }
      if (err) console.log(err);
    } else {
      alert("Please log in to save a movie");
    }
  };
  const deleteList = async (id) => {
    if (user) {
      const { res, err } = await Service.deleteLists({ id });
      if (res) {
        setLists((prevMovies) => prevMovies.filter((list) => list._id !== id));
      }
      if (err) console.log(err);
    } else {
      alert("Please log in to save a movie");
    }
  };

  const handleDeleteItemInList = async (movieId, listId) => {
    const { res, err } = await Service.removeMovieInList({ movieId, listId });
    if (res)
      setMovieInList((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== movieId)
      );
    if (err) console.log(err);
  };

  const handleClickList = async (id) => {
    setShowModalList(!showModalList);
    const { res, err } = await Service.getMovieOfList({ listId: id });
    if (res) setMovieInList(res);
    if (err) console.log(err);
  };

  return (
    <div className="px-6 my-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold py-2 my-4">My lists</h1>
        <button
          onClick={() => setShowModal(!showModal)}
          className="bg-sky-700 text-white p-2 rounded-md text-sm font-semibold hover:bg-sky-950"
        >
          Create List
          <FontAwesomeIcon className="ml-2" icon={faPlus} />
        </button>
      </div>
      <div className="relative flex items-center "></div>
      <div className="grid grid-cols-3 gap-4 my-6">
        {lists?.map((list, index) => (
          <div
            key={index}
            className="relative cursor-pointer border border-slate-200 rounded-md group"
          >
            <div onClick={() => handleClickList(list?._id)}>
              <div className="w-full h-auto p-2 ">
                <img
                  className="w-full h-full rounded object-cover"
                  src={lightBlue}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 rounded bg-gradient-to-b to-green-200 from-transparent opacity-70 group-hover:opacity-100 text-black">
                  <p className="text-xl font-bold my-2 flex items-center justify-center h-full text-center uppercase">
                    {list?.title}
                  </p>
                </div>
              </div>
            </div>
            <p
              onClick={() => deleteList(list?._id)}
              className="absolute text-black top-4 right-4 cursor-pointer opacity-0 group-hover:opacity-100 "
            >
              <FontAwesomeIcon
                className=" hover:bg-sky-100 hover:scale-125 w-4 h-4 p-1 rounded-full"
                icon={faClose}
              />
            </p>
          </div>
        ))}
      </div>
      {/* modal create list */}
      <div>
        {showModal ? (
          <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div
              onClick={() => setShowModal(false)}
              className="w-full h-full bg-gray-900 opacity-40"
            ></div>

            <div className=" bg-white w-1/2 absolute mx-auto rounded-md shadow-lg z-50 p-8">
              <div className=" text-left">
                <div className="flex justify-between items-center pb-10 ">
                  <p className="text-2xl font-bold">Create List</p>
                  <div
                    onClick={() => setShowModal(false)}
                    className=" cursor-pointer z-50 w-6 h-6 rounded-full text-center hover:shadow hover:shadow-slate-400"
                  >
                    <FontAwesomeIcon className="text-base" icon={faClose} />
                  </div>
                </div>

                <div>
                  <div className=" w-full mb-6 group">
                    <label
                      htmlFor="name"
                      className=" text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Name
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="name"
                      className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                  </div>
                  <div className="w-full mb-6 group">
                    <label
                      htmlFor="desc"
                      className=" text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Description
                    </label>
                    <input
                      onChange={(e) => setDesc(e.target.value)}
                      type="text"
                      name="desc"
                      className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleCreateList}
                  className="flex items-center px-4 mx-1 bg-sky-500 p-3 rounded-lg text-white hover:bg-sky-600"
                >
                  Create
                  <LoadingSpin loading={loading} />
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 p-3 mx-1 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* modal List */}
      <div>
        {showModalList ? (
          <div className="fixed w-full h-full top-8 left-0 flex items-center justify-center">
            <div
              onClick={() => setShowModalList(false)}
              className="w-full h-full bg-gray-900 opacity-40"
            ></div>

            <div className=" bg-white w-3/4  absolute mx-auto rounded-md shadow-lg z-50 p-8">
              <div className=" text-left">
                <div className="flex justify-between items-center pb-10 ">
                  <div
                    onClick={() => setShowModalList(false)}
                    className=" cursor-pointer z-50 w-6 h-6 rounded-full text-center hover:shadow hover:shadow-slate-400"
                  >
                    <FontAwesomeIcon className="text-base" icon={faClose} />
                  </div>
                </div>

                <div className="h-[380px] overflow-y-auto">
                  <div className="grid grid-cols-4 gap-3 ">
                    {movieInList?.length === 0 ? (
                      <p className=" col-span-4 text-center text-xl font-base uppercase">
                        empty list
                      </p>
                    ) : (
                      movieInList?.map((movie, index) => (
                        <div
                          key={index}
                          className="relative cursor-pointer group"
                        >
                          <a href={`/details/${movie?.type}/${movie?.mediaId}`}>
                            <div className=" w-full h-full shadow shadow-slate-400 rounded ">
                              <img
                                className="rounded-t w-full h-auto object-cover"
                                src={`https://image.tmdb.org/t/p/original/${movie?.mediaPoster}`}
                                alt=""
                              />
                              <div className="text-center text-sm font-semibold p-2">
                                {movie?.mediaTitle}
                              </div>
                              <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 rounded opacity-0 group-hover:opacity-20"></div>
                            </div>
                          </a>
                          <p
                            onClick={() =>
                              handleDeleteItemInList(movie?._id, movie?.list)
                            }
                            className="absolute text-gray-300 top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100"
                          >
                            <FontAwesomeIcon
                              className=" hover:bg-slate-800 hover:scale-110 w-4 h-4 p-1 rounded-full"
                              icon={faClose}
                            />
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowModalList(false)}
                  className="px-4 p-3 mx-1 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ListsAcc;
