import { faListDots, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { UserAuth } from "../context/AuthContext";
import { LoadingSpin } from "./Loading";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function AddList({ slug, detail }) {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleAddLists = async (list) => {
    const movieID = doc(db, "users", `${user?.email}`);

    if (user?.email) {
      setLoading(true);
      await updateDoc(movieID, {
        "Lists.allMovie": arrayUnion({
          id: detail?.id,
          title: detail?.title ? detail?.title : detail?.name,
          img: detail?.backdrop_path
            ? detail?.backdrop_path
            : detail?.poster_path,
          type: slug,
          listId: list?.id,
        }),
      });
      try {
        setLoading(false);
        setShowList(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };
  const handleClickCreateList = () => {
    if (user?.email) {
      navigate("/account/lists");
    } else {
      setShowList(false);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setLists(doc.data()?.Lists.allList);
    });
  }, [user?.email]);

  return (
    <>
      {alert ? (
        <div className="w-[320px] fixed right-2 top-28">
          <Alert
            title={"Warning alert !"}
            desc={"Please log in to save a movie"}
          />
        </div>
      ) : (
        <></>
      )}
      <div className=" ml-4 text-white text-lg ">
        <div className="relative">
          {loading ? (
            <div className="py-2">
              <LoadingSpin loading={loading} />
            </div>
          ) : (
            <FontAwesomeIcon
              onClick={() => setShowList(!showList)}
              icon={faListDots}
              className=" p-2 text-sm cursor-pointer border border-slate-100 text-slate-100  rounded-full"
            />
          )}
          {showList ? (
            <div className="absolute right-[-20px] w-[180px] bg-white text-sm rounded text-black ">
              <div className="flex items-center border-b border-slate-400">
                <p className="font-semibold p-2 rounded-t">
                  Add to one of your lists
                </p>
              </div>
              <ul className="p-2">
                {lists ? (
                  lists?.map((list, index) => (
                    <li
                      onClick={() => handleAddLists(list)}
                      key={index}
                      className={`p-1 hover:bg-slate-200 cursor-pointer`}
                    >
                      {`${list?.name} `}
                    </li>
                  ))
                ) : (
                  <div
                    onClick={handleClickCreateList}
                    className={`p-1 hover:text-slate-500 cursor-pointer font-semibold`}
                  >
                    Create new list
                    <FontAwesomeIcon className="pl-2" icon={faPlus} />
                  </div>
                )}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default AddList;
