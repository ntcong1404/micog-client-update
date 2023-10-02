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
    slidesToShow: 3.7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    draggable: false,
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
      <div className="my-4">
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
