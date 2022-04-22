import Image from "next/image";
import React, { useState } from "react";
import what from "../public/whatsbg.jpeg";
import Sign from "./Sign";

function Login() {
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <div className=" bg-cus h-screen bg-no-repeat bg-cover">
      <div className="bg-transparent  flex px-10 w-full items-center justify-between shadow-md">
        <h1 className="sm:text-4xl text-2xl text-white  font-bold font-mono p-5 cursor-pointer animate-bounce">
          JAYMOVIES
        </h1>

        <div
          className="bg-teal-600 text-white py-2 px-5 hover:bg-teal-400 transition-all"
          onClick={() => setSignIn(true)}
        >
          <a href="#" className=" sm:text-2xl text-xl font-bold">
            Sign Up
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-2/3">
        {signIn ? (
          <Sign email={email} setEmail={setEmail} />
        ) : (
          <div className="text-center text-white">
            <h1 className="sm:text-4xl text-2xl font-bold drop-shadow">
              Watch Movies and Tv Programmes
            </h1>
            <h2 className="text-sm  my-6">watch anywhere cancel at anytime</h2>
            <form>
              <input
                type="email"
                placeholder="Email Address"
                className="p-5 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-teal-600 p-5"
                onClick={() => setSignIn(true)}
              >
                GET STARTED
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
