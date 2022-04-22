import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

function Sign({ email, setEmail }) {
  const [password, setPassword] = useState("");
  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // Signed in
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  };
  const SignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // Signed in
        // ...
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="bg-slate-800 p-7 min-w-[500px] rounded drop-shadow-lg shadow-lg">
      <h1 className="text-2xl text-white font-bold">Sign In</h1>
      <form className="flex flex-col">
        <input
          type="email"
          className="p-5 outline-none my-4 rounded-md"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="Password"
          className="p-5 outline-none my-4 rounded-md"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={SignIn}
          className="bg-teal-600 my-7 text-white rounded-bl-lg rounded-tr-lg hover:bg-teal-400 transition-all p-5"
        >
          Sign In
        </button>
        <p className="text-sm text-gray-400">
          New to JayMovies?
          <span
            className="ml-2 text-white cursor-pointer hover:text-gray-100 transition-all"
            onClick={register}
          >
            Sign Up now
          </span>
        </p>
      </form>
    </div>
  );
}

export default Sign;
