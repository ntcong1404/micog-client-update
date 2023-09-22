import { useEffect, useState } from "react";
import Movie from "./Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import * as Service from "../apiService/Service";

function List({ title, rowID, axiosURL }) {
  const [list, setList] = useState([]);
  const [time, setTime] = useState("day");

  useEffect(() => {
    Service.Trending({ item: axiosURL, time: time })
      .then((res) => {
        setList(res?.results);
      })
      .catch((err) => console.log(err));
  }, [axiosURL, time]);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div
      className={`pt-6 pb-2 bg-list 
        ${
          title === "TV Series Trending" || title === "person"
            ? "bg-slate-100"
            : ""
        }`}
    >
      <div className="flex items-center pt-4 px-6 w-full h-full ">
        <h2 className="text-black uppercase font-semibold text-xl p-4 mr-10">
          {title}
        </h2>
        <div className="inline-flex h-8 ml-4 rounded-full border-[2px] border-slate-500">
          <button
            className={`text-sm font-semibold px-4 py-1 rounded-3xl ${
              time === "day" ? `bg-slate-300 text-black` : ``
            }`}
            onClick={() => setTime("day")}
          >
            Day
          </button>

          <button
            className={`text-sm font-semibold px-4 py-1 rounded-3xl ${
              time === "week" ? `bg-slate-300 text-black` : ``
            }`}
            onClick={() => setTime("week")}
          >
            This Week
          </button>
        </div>
      </div>
      <div className="relative  flex items-center group px-6">
        <FontAwesomeIcon
          icon={faChevronCircleLeft}
          onClick={slideLeft}
          className="bg-white text-3xl rounded-full absolute top-[43%] left-9 translate-y-[-50%] opacity-70 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block "
        />
        <div
          id={"slider" + rowID}
          className="w-full h-[300px]  overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {list?.map((item, id) => (
            <Movie key={id} item={item} list />
          ))}
        </div>
        <FontAwesomeIcon
          icon={faChevronCircleRight}
          onClick={slideRight}
          className="bg-white text-3xl right-7 top-[43%]  translate-y-[-50%] rounded-full absolute opacity-70 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </div>
  );
}

export default List;
