import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LoadingSpin } from "./Loading.jsx";
import Alert from "./Alert.jsx";
import * as Service from "../apiService/Service.js";

function Profile() {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [name, setName] = useState(user?.displayName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { res, err } = await Service.profileUpdate({
      displayName: name,
      password: pass,
      newPassword: newPass,
    });
    if (err) {
      setLoading(false);
      setError(err.message);
    }
    if (res) {
      localStorage.removeItem("micog");
      setLoading(false);
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div>
      {!!error && <Alert title="Warning" desc={error} />}
      <div className=" p-5">
        <div className="mt-5  ">
          <form onSubmit={handleSubmit} method="POST">
            <div className="shadow rounded-md overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 p-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className=" col-span-1">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-lg font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          disabled
                          type="email"
                          className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full text-sm border-gray-300 rounded-md"
                          value={user?.email}
                        ></input>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="name"
                        className="text-lg font-medium text-gray-700"
                      >
                        Display name
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={name}
                          className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full text-sm border-gray-300 rounded-md"
                          placeholder="Your name"
                          onChange={(e) => setName(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className=" col-span-1">
                    <div>
                      <label
                        htmlFor="pass"
                        className="text-lg font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="pass"
                          name="pass"
                          type="text"
                          className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full text-sm border-gray-300 rounded-md"
                          placeholder="Password"
                          onChange={(e) => setPass(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="pass"
                        className="text-lg font-medium text-gray-700"
                      >
                        New password
                      </label>
                      <div className="mt-1">
                        <input
                          id="pass"
                          name="pass"
                          type="text"
                          className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full text-sm border-gray-300 rounded-md"
                          placeholder="New password"
                          onChange={(e) => setNewPass(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right ">
                <NavLink
                  to={"/account/favorites"}
                  className="inline-flex justify-center mx-1 py-[6px] px-8 text-lg font-medium rounded-md text-black border-[2px] border-slate-200 hover:bg-gradient-to-t hover:from-slate-200 hover:to-slate-300 "
                >
                  Cancel
                </NavLink>
                <button className="inline-flex justify-center mx-1 py-[6px] px-10 text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-gradient-to-t hover:from-sky-500 hover:to-blue-500 ">
                  Save
                  <LoadingSpin loading={loading} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
