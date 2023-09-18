import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import LikeLists from "../components/LikeLists";
import { useState } from "react";

function AccPage() {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return (
      <div>
        <div className="w-full text-white">
          <div className="relative w-full h-[200px]">
            <img
              className=" w-full h-full object-cover"
              src="https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg"
              alt="/"
            />
            <div className="bg-black/60 absolute top-0 left-0 right-0 bottom-0"></div>
            <div className="absolute top-[30%] p-6 ">
              <h1 className="text-5xl font-bold">My Lists</h1>
            </div>
          </div>
        </div>

        <LikeLists />
      </div>
    );
  }
}

export default AccPage;
