import { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpin } from "../components/Loading";

import { bgSignup } from "../assets";

function SignupPage() {
  const navigate = useNavigate();
  const { user, createUser } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      setLoading(true);
      await createUser(email, password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error.code);
      setErr(error.code);
    }
  };

  return (
    <div className="w-full h-screen ">
      <div className="mt-[-76px]">
        <img
          className="absolute w-full h-screen object-cover"
          src={bgSignup}
          alt="/"
        />
      </div>
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen "></div>
      <div className="fixed top-6 w-full px-4 mt-24 z-50">
        <div className="max-w-[450px] h-auto mx-auto bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <div>
              {err === "auth/email-already-in-use" ? (
                <p className="mt-4 p-2 text-sm text-center text-slate-100 bg-red-600 rounded-md">
                  Email already in use
                </p>
              ) : err === "Username must be lower case" ? (
                <p className="mt-4 p-2 text-sm text-center text-slate-100 bg-red-600 rounded-md">
                  Username must be lower case
                </p>
              ) : (
                <></>
              )}
            </div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErr(
                    e.target.value === e.target.value.toLowerCase()
                      ? null
                      : "Username must be lower case"
                  );
                }}
                className="p-3 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                required
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                type={showPassword ? "text" : "password"}
                minLength={6}
                maxLength={10}
                placeholder="Password"
                autoComplete="current-password"
              />
              <div className="flex justify-between items-center text-sm text-gray-600">
                <p>
                  <input
                    className="mr-2"
                    type="checkbox"
                    onClick={(e) => setShowPassword(e.target.checked)}
                  />
                  <label>
                    {!showPassword ? "Show password" : "Hide password"}
                  </label>
                </p>
              </div>
              <button className="flex justify-center items-center text-black bg-red-600 py-3 my-6 rounded font-bold hover:text-slate-100">
                Sign Up
                <LoadingSpin loading={loading} />
              </button>

              <p className="py-8">
                <span className="text-gray-600">
                  Do you already have an account ?
                </span>{" "}
                <NavLink
                  className="text-gray-300 hover:text-slate-50"
                  to="/login"
                >
                  Sign In
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
