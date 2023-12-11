import { NavLink, useLocation } from "react-router-dom";
import { logo } from "../../../assets";
import { UserAuth } from "../../../context/AuthContext";
import { polygon } from "../../../assets";
import * as Service from "../../../apiService/Service";

function Header() {
  const { user } = UserAuth();
  const location = useLocation();
  const handleLogout = async () => {
    const { res, err } = await Service.logout();
    if (res) {
      localStorage.removeItem("micog");
      window.location.reload();
    }
    if (err) console.log(err);
  };

  const isMovie = (pathname) => {
    return pathname.includes("/movie");
  };
  const isTv = (pathname) => {
    return pathname.includes("/tv");
  };
  const isPres = (pathname) => {
    return pathname.includes("/person");
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-40 px-6 py-2 bg-gray-950 text-white">
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
                className={`relative flex items-center justify-center text-sm mr-10 px-2 py-5 uppercase cursor-pointer `}
              >
                {isMovie(location.pathname) ? (
                  <img className="w-2 h-2" src={polygon} alt="polygon" />
                ) : (
                  ""
                )}
                movies
              </NavLink>
              <NavLink
                to={"/tv/popular"}
                isActive={() => {
                  return isTv(location.pathname);
                }}
                className={`relative flex items-center justify-center text-sm mr-10 px-2 py-5 uppercase cursor-pointer  `}
              >
                {isTv(location.pathname) ? (
                  <img className="w-2 h-2" src={polygon} alt="polygon" />
                ) : (
                  ""
                )}
                tv shows
              </NavLink>
              <NavLink
                to={"/person/popular"}
                isActive={() => {
                  return isPres(location.pathname);
                }}
                className={`relative flex items-center justify-center text-sm mr-10 px-2 py-5 uppercase cursor-pointer  `}
              >
                {isPres(location.pathname) ? (
                  <img className="w-2 h-2" src={polygon} alt="polygon" />
                ) : (
                  ""
                )}
                people
              </NavLink>
              <NavLink
                to={"/search"}
                className={`text-sm mr-10 ml-6 px-2 py-5 uppercase cursor-pointer  `}
              >
                search
              </NavLink>
            </div>
          </div>
          <div className="flex items-center mr-2 ">
            {user ? (
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
