import { useEffect, useState } from "react";
import Movie from "./Movie";
import * as Service from "../apiService/Service";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PulseLoader from "react-spinners/PulseLoader";

function List({ title, axiosURL }) {
  const [list, setList] = useState([]);
  const [time, setTime] = useState("day");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    Service.Trending({ item: axiosURL, time: time })
      .then((res) => {
        setList(res?.results);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [axiosURL, time]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    draggable: false,
    pauseOnDotsHover: true,
    slidesToShow: 3,
    variableWidth: true,
  };
  return (
    <div
      className={`py-8 
        ${
          title === "TV Series Trending"
            ? " bg-list bg-slate-50"
            : title === "Movie Trending"
            ? " bg-list"
            : "bg-results"
        }`}
    >
      <div className="flex items-center px-6 ">
        <h2 className="text-black uppercase font-semibold text-2xl p-4 mr-10">
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
      <div className="my-6 ">
        {loading ? (
          <div className="flex justify-center items-center w-full flex-col ">
            <PulseLoader color="gray" size={8} speedMultiplier={1.5} />
          </div>
        ) : (
          <Slider {...settings}>
            {list?.map((item, id) => (
              <Movie key={id} item={item} list />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default List;
