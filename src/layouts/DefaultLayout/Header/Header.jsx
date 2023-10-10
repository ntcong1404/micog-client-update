import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logo, movieIcon, personIcon, seriesIcon } from "../../../assets";
import {
  faArrowUp,
  faChevronUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { UserAuth } from "../../../context/AuthContext";

function Header() {
  const { user, logOut } = UserAuth();
  const location = useLocation();

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [warning, setWarning] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setWarning(false);
    const searchValue = e.target.value.trim();
    setSearchValue(searchValue);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      setWarning(!warning);
    }
    if (searchValue !== "") {
      navigate(`/search/${searchValue}`);
    }
  };
  const isMovie = (pathname) => {
    return (
      pathname.startsWith("/movie/") || pathname.startsWith("/details/movie/")
    );
  };
  const isTv = (pathname) => {
    return pathname.startsWith("/tv/") || pathname.startsWith("/details/tv/");
  };
  const isPres = (pathname) => {
    return (
      pathname.startsWith("/person/") || pathname.startsWith("/details/person/")
    );
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 px-6 py-4 bg-gray-950 text-white">
        <nav className="flex space-x-4 justify-between ">
          <div className="flex space-x-4 items-center">
            <a
              href="/"
              className="mr-6 hover:cursor-pointer w-[160px] h-[36px]"
            >
              <img className="w-full h-full" src={logo} alt="" />
            </a>
            <div className="flex items-center">
              <NavLink
                to={"/movie/now_playing"}
                isActive={() => {
                  return isMovie(location.pathname);
                }}
                className={`relative flex items-center justify-center text-sm mr-10 px-1 py-2 uppercase cursor-pointer `}
              >
                {isMovie(location.pathname) ? (
                  <div className="absolute bottom-[-12px] ">
                    <FontAwesomeIcon
                      className="text-slate-500 text-[10px]"
                      icon={faChevronUp}
                    />
                  </div>
                ) : (
                  ""
                )}
                <img className="w-[22px] mx-1 " src={movieIcon} alt="" />
                movies
              </NavLink>
              <NavLink
                to={"/tv/popular"}
                isActive={() => {
                  return isTv(location.pathname);
                }}
                className={`relative flex items-center justify-center text-sm mr-10 px-1 py-2 uppercase cursor-pointer  `}
              >
                {isTv(location.pathname) ? (
                  <div className="absolute bottom-[-12px] ">
                    <FontAwesomeIcon
                      className="text-slate-500 text-[10px]"
                      icon={faChevronUp}
                    />
                  </div>
                ) : (
                  ""
                )}
                <img className="w-[22px] mx-1  " src={seriesIcon} alt="" />
                tv shows
              </NavLink>
              <NavLink
                to={"/person/popular"}
                isActive={() => {
                  return isPres(location.pathname);
                }}
                className={`relative flex items-center justify-center text-sm mr-10 px-1 py-2 uppercase cursor-pointer  `}
              >
                {isPres(location.pathname) ? (
                  <div className="absolute bottom-[-12px] ">
                    <FontAwesomeIcon
                      className="text-slate-500 text-[10px]"
                      icon={faChevronUp}
                    />
                  </div>
                ) : (
                  ""
                )}
                <img className="w-[20px] mx-1 " src={personIcon} alt="" />
                people
              </NavLink>
            </div>
          </div>
          <div className="flex items-center mr-2 ">
            <form onSubmit={handleSearch} className=" py-1 rounded px-4 ">
              <input
                type="search"
                className="p-2 mr-2 text-sm text-gray-900  rounded bg-gray-50  dark:text-white"
                placeholder="Search here..."
                onChange={handleChange}
              />
              {warning ? (
                <div
                  className="absolute top-[60px] z-20 flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>Please enter search keywords</div>
                </div>
              ) : (
                <></>
              )}
              <button
                type="submit"
                className="text-white font-medium rounded text-sm px-4 py-2 hover:bg-gray-800"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            {user?.email ? (
              <>
                <NavLink
                  to={"/account/favorites"}
                  className="bg-red-600 text-white px-6 py-2 rounded cursor-pointer mr-2 hover:contrast-125"
                >
                  Account
                </NavLink>
                <button
                  onClick={handleLogout}
                  className=" px-6 py-2 rounded cursor-pointer text-white hover:bg-slate-800 "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to={"/signup"}
                  className="text-white px-6 py-2 rounded cursor-pointer mr-2 hover:bg-gradient-to-t hover:from-gray-900 hover:to-transparent "
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to={"/login"}
                  className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white hover:contrast-125"
                >
                  Log In
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
