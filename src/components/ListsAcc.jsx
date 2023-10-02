import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { updateDoc, doc, onSnapshot, arrayUnion } from "firebase/firestore";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { LoadingSpin } from "./Loading";
import { useNavigate } from "react-router-dom";

function ListsAcc() {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalList, setShowModalList] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [movieInList, setMovieInList] = useState([]);
  const [lists, setLists] = useState([]);
  const [chooseList, setChooseList] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setLists(doc.data()?.Lists.allList);
      setMovieInList(doc.data()?.Lists.allMovie);
    });
  }, [user?.email]);

  const movieID = doc(db, "users", `${user?.email}`);

  const handleCreate = async () => {
    if (user?.email) {
      setLoading(true);
      await updateDoc(movieID, {
        "Lists.allList": arrayUnion({
          id: Math.floor(Math.random() * 1000000) + 1,
          name: name,
          description: desc,
        }),
      });
      setLoading(false);
      setShowModal(false);
    } else {
      alert("Please log in to save a movie");
    }
  };

  const handleClickItem = (movie) => {
    navigate(`/details/${movie?.type}/${movie?.id}`);
  };

  const handleClickList = (list) => {
    setShowModalList(!showModalList);
    setChooseList(list);
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
            onClick={() => handleClickList(list)}
            className="grid grid-rows-3 justify-items-center items-center p-6 shadow shadow-slate-400 border border-slate-200 bg-gradient-to-t from-slate-100 to-transparent rounded overflow-hidden hover:shadow-md hover:shadow-gray-400 cursor-pointer"
            key={index}
          >
            <h3 className="text-xl font-semibold py-1 my-1 row-span-2">
              {list.name}
            </h3>
            <p className="py-1 my-1 row-span-1">{list.description}</p>
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
                  onClick={handleCreate}
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
                  <p className="text-2xl uppercase font-bold">
                    {chooseList?.name}
                  </p>
                  <div
                    onClick={() => setShowModalList(false)}
                    className=" cursor-pointer z-50 w-6 h-6 rounded-full text-center hover:shadow hover:shadow-slate-400"
                  >
                    <FontAwesomeIcon className="text-base" icon={faClose} />
                  </div>
                </div>

                <div className="h-[380px] overflow-y-auto">
                  <div className="grid grid-cols-4 gap-3 ">
                    {movieInList?.map((movie, index) =>
                      chooseList?.id === movie?.listId ? (
                        <div
                          onClick={() => handleClickItem(movie)}
                          key={index}
                          className="w-full shadow shadow-slate-400 rounded cursor-pointer hover:translate-y-[-2px] hover:shadow-md hover:shadow-slate-400 "
                        >
                          <img
                            className="rounded-t w-full h-auto object-cover"
                            src={`https://image.tmdb.org/t/p/original/${movie?.img}`}
                            alt=""
                            loading="lazy"
                          />
                          <div className="text-center text-sm font-semibold p-2">
                            {movie?.title}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )
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
