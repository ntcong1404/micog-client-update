import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCircleCheck,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { UserAuth } from "../context/AuthContext";
import Alert from "./Alert";
import * as Service from "../apiService/Service";

function Like({ slug, detail, setLike, like }) {
  const { user } = UserAuth();
  const [alert, setAlert] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    Service.getFavorites()
      .then(({ res, err }) => {
        if (res) setFavoriteList(res);
        if (err) console.log(err);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLike = async (id) => {
    if (user) {
      if (detail?.isFavorite) {
        const favoriteItem = favoriteList.find(
          (e) => e.mediaId.toString() === id.toString()
        );
        const { res, err } = await Service.deleteFavorites({
          id: favoriteItem._id,
        });
        if (res) setLike(!like);
        if (err) console.log("err delete favorite");
      } else {
        const { res, err } = await Service.addFavorites({
          type: slug,
          mediaId: id,
          mediaTitle: detail?.title ? detail?.title : detail?.name,
          mediaPoster: detail?.backdrop_path
            ? detail?.backdrop_path
            : detail?.poster_path,
        });
        if (res) setLike(!like);
        if (err) console.log("err add favorite");
      }
      // window.location.reload();
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

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
      <div
        onClick={() => handleLike(detail?.id)}
        className=" ml-10 text-white text-lg "
      >
        {detail?.isFavorite ? (
          <FontAwesomeIcon
            icon={faHeartCircleCheck}
            className=" p-2 text-sm cursor-pointer border border-slate-100 text-red-600 rounded-full"
          />
        ) : (
          <FontAwesomeIcon
            icon={faHeartCirclePlus}
            className=" p-2 text-sm cursor-pointer border border-slate-100 text-slate-100  rounded-full"
          />
        )}
      </div>
    </>
  );
}

export default Like;
