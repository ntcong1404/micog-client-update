import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCircleCheck,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";

function Like({ slug, detail }) {
  const { user } = UserAuth();
  const [likeLists, setLikeLists] = useState([]);

  const movieID = doc(db, "users", `${user?.email}`);

  const handleLike = async (id) => {
    if (user?.email) {
      if (
        likeLists?.find((item) => item?.id === detail?.id)?.id === detail?.id
      ) {
        const result = likeLists?.filter((item) => item?.id !== id);
        await updateDoc(movieID, {
          likeLists: result,
        });
      } else {
        await updateDoc(movieID, {
          likeLists: arrayUnion({
            id: detail?.id,
            title: detail?.title ? detail?.title : detail?.name,
            img: detail?.backdrop_path
              ? detail?.backdrop_path
              : detail?.poster_path,
            type: slug,
          }),
        });
      }
    } else {
      alert("Please log in to save a movie");
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setLikeLists(doc.data()?.likeLists);
    });
  }, [user?.email]);
  return (
    <div
      onClick={() => handleLike(detail?.id)}
      className=" ml-10 text-white text-xl "
    >
      {likeLists?.find((item) => item.id === detail?.id)?.id === detail?.id ? (
        <FontAwesomeIcon
          icon={faHeartCircleCheck}
          className=" p-2 cursor-pointer border border-slate-50 text-red-600 rounded-full"
        />
      ) : (
        <FontAwesomeIcon
          icon={faHeartCirclePlus}
          className=" p-2 cursor-pointer border border-slate-50  rounded-full"
        />
      )}
    </div>
  );
}

export default Like;
