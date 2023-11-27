import { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpin } from "../components/Loading";

import { bgSignup } from "../assets";
import { Helmet } from "react-helmet-async";
import * as Service from "../apiService/Service";

function SignupPage() {
  const navigate = useNavigate();
  const { user, createUser } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const { res, err } = await Service.signUp({
      email,
      password,
      displayName,
    });
    if (res) {
      localStorage.setItem("actkn", res.token);
      setLoading(false);
      navigate("/");
      window.location.reload();
    }
    if (err) {
      setLoading(false);
      setErr(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Signup - M I C O G</title>
        <meta name="signup page" content="signup account" />
      </Helmet>
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
                {err ? (
                  <p className="mt-4 p-2 text-sm text-center text-slate-100 bg-red-600 rounded-md">
                    {err}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="p-3 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <input
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                  }}
                  className="p-3 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  type="text"
                  placeholder="Display Name"
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
    </>
  );
}

export default SignupPage;
