import { NavLink, Navigate, useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import LikeLists from "../components/LikeLists";
import dayjs from "dayjs";

import Profile from "../components/Profile";

function AccPage() {
  const { user } = UserAuth();
  const { slug } = useParams();

  const createdAt = dayjs(user?.metadata?.creationTime).format("MMMM YYYY");
  if (!user) {
    return <Navigate to="/" />;
  } else {
    return (
      <div>
        <div className="w-full text-white">
          <div className="relative w-full h-[240px]">
            <img
              className=" w-full h-full object-cover"
              src="https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg"
              alt="/"
            />
            <div className="bg-black/60 absolute top-0 left-0 right-0 bottom-0"></div>
            <div className="absolute top-[16%] p-6 flex items-center">
              {user?.photoURL ? (
                <div className="w-32 h-32 mx-6 flex items-center text-4xl font-bold justify-center rounded-full">
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-28 h-28 mx-6 flex items-center text-4xl font-bold justify-center bg-gradient-to-t from-blue-500 to-green-300 rounded-full">
                  {user?.displayName
                    ? user?.displayName?.charAt(0)
                    : user?.email?.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold mx-4 my-2">
                  {user?.displayName
                    ? user?.displayName
                    : user?.email?.substring(0, user?.email.indexOf("@"))}
                </h1>
                <h1 className="text-sm mx-5 my-2 text-slate-300">
                  Member since {createdAt}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 text-base font-bold text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap justify-center ">
            <li className="mr-2">
              <NavLink
                to={"/account/profile"}
                className={(nav) =>
                  ` ${
                    nav.isActive
                      ? "inline-block p-4 text-red-600 border-b-2 border-red-600 rounded-t-lg dark:text-red-500 dark:border-red-500"
                      : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-red-200 dark:hover:text-gray-300"
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
            <li className="mr-2">
              <NavLink
                to={"/account/favorites"}
                className={(nav) =>
                  ` ${
                    nav.isActive
                      ? "inline-block p-4 text-red-600 border-b-2 border-red-600 rounded-t-lg dark:text-red-500 dark:border-red-500"
                      : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-red-200 dark:hover:text-gray-300"
                  }`
                }
              >
                Favorites
              </NavLink>
            </li>
          </ul>
        </div>

        {slug === "favorites" ? <LikeLists /> : <Profile />}
      </div>
    );
  }
}

export default AccPage;
