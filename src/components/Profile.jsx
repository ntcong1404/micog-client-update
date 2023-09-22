import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { user, updateUserProfile, updateUserPassword } = UserAuth();
  const [pass, setPass] = useState("");
  const [name, setName] = useState(user?.displayName ? user?.displayName : "");
  const [img, setImg] = useState(user?.photoURL ? user?.photoURL : "");

  const handleChooseFileAvatar = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      setImg(URL.createObjectURL(e.target.files[0]));
    }
    return () => URL.revokeObjectURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name, img);
      await updateUserPassword(pass);
      navigate("/account/favorites");
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <div>
      <div className="p-6">
        <div className="mt-5  ">
          <form onSubmit={handleSubmit} method="POST">
            <div className="shadow rounded-md overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 p-6">
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
                      className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-[50%] text-sm border-gray-300 rounded-md"
                      value={user?.email}
                    ></input>
                  </div>
                </div>
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
                      minLength={6}
                      maxLength={10}
                      className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-[50%] text-sm border-gray-300 rounded-md"
                      placeholder="New password"
                      onChange={(e) => setPass(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
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
                      className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-[50%] text-sm border-gray-300 rounded-md"
                      placeholder="Your name"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div>
                  <label className="text-lg font-medium text-gray-700">
                    Avatar
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    {img === "" ? (
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="True"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleChooseFileAvatar}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    ) : (
                      <div className="flex item-center">
                        <FontAwesomeIcon
                          onClick={() => setImg("")}
                          className="text-slate-400 text-sm cursor-pointer hover:bg-slate-200 w-3 h-3 p-1 rounded-full"
                          icon={faClose}
                        />
                        <div className="flex flex-col items-center">
                          <img
                            className="w-36 h-36 mx-6 object-cover rounded-full"
                            src={img}
                            alt=""
                          />
                          <p className="mt-2 pt-2 text-xs text-slate-300">
                            Lưu ý rằng URL tạm thời này chỉ tồn tại trong phiên
                            làm việc hiện tại
                          </p>
                          <p className=" text-xs text-slate-300">
                            và không thể sử dụng để lưu trữ hay chia sẻ ảnh lâu
                            dài.
                          </p>
                        </div>
                      </div>
                    )}
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
