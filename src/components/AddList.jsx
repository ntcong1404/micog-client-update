import { faListDots, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { UserAuth } from "../context/AuthContext";

function AddList({ slug, detail }) {
  const { user } = UserAuth();
  const [lists, setLists] = useState([]);
  const [showList, setShowList] = useState(false);
  console.log(lists);
  const handleAddLists = async (list) => {
    const movieID = doc(db, "users", `${user?.email}`);

    if (user?.email) {
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
        setShowList(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please log in to save a movie");
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setLists(doc.data()?.Lists.allList);
    });
  }, [user?.email]);

  return (
    <div className=" ml-4 text-white text-lg ">
      <div className="relative">
        <FontAwesomeIcon
          onClick={() => setShowList(!showList)}
          icon={faListDots}
          className=" p-2 cursor-pointer border border-slate-100 text-slate-100  rounded-full"
        />
        {showList ? (
          <div className="absolute right-[-20px] w-[180px] bg-white text-sm rounded text-black ">
            <p className="font-semibold border-b border-slate-400 p-2 rounded-t">
              Add to one of your lists
            </p>
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
                <a
                  href={"/account/lists"}
                  className={`p-1 hover:text-slate-500 cursor-pointer font-semibold`}
                >
                  Create new list
                  <FontAwesomeIcon className="pl-2" icon={faPlus} />
                </a>
              )}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AddList;
