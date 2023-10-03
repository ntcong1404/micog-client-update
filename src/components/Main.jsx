import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Service from "../apiService/Service";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Main() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const handlePlay = (id) => {
    navigate(`/details/movie/${id}`);
  };

  useEffect(() => {
    Service.Main()
      .then((res) => {
        setMovies(res?.results);
      })
      .catch((err) => console.log(err));
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings}>
      {movies?.map((movie, index) => (
        <div key={index} className="w-full h-[600px] ">
          <div className="w-full h-full ">
            <div className="absolute w-full h-auto "></div>
            <img
              className="w-full h-auto object-cover "
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
            />
            <div className="absolute top-0 bottom-0 text-slate-50 px-20 py-40  bg-gradient-to-r from-black to-transparent ">
              <h1 className="text-5xl font-bold my-4 ">{movie?.title}</h1>
              <div className="mt-14 mb-6">
                <button
                  onClick={() => handlePlay(movie?.id)}
                  className="rounded-sm text-lg font-semibold bg-red-600 text-white py-2 px-5 border border-black hover:scale-105"
                >
                  Learn More
                </button>
              </div>
              <p className="  w-[500px]">{movie?.overview}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default Main;
