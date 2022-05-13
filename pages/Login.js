import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Sign from "./Sign";

function Login() {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const container = {
    hidden: { opacity: 0, marginLeft: "-100px" },
    show: {
      opacity: 1,
      marginLeft: "0px",
      transition: {
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, marginLeft: "-100px" },
    show: { opacity: 1, marginLeft: "0px" },
  };
  return (
    <div className=" bg-cus h-screen bg-no-repeat bg-cover">
      <div className="bg-transparent  flex px-10 w-full items-center justify-between shadow-md">
        <h1 className="sm:text-4xl text-2xl text-white  font-bold font-mono p-5 cursor-pointer animate-bounce">
          JAYMOVIES
        </h1>

        <div
          className="bg-teal-600 text-white py-2 md:px-5 px-2 hover:bg-teal-400 transition-all"
          onClick={() => setSignIn(true)}
        >
          <a href="#" className=" sm:text-2xl  font-bold">
            Sign In
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-2/3">
        {signIn ? (
          <Sign email={email} setEmail={setEmail} title={"Sign In"} />
        ) : signUp ? (
          <Sign email={email} setEmail={setEmail} title={"Sign Up"} reg />
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center text-white"
          >
            <motion.h1
              variants={item}
              className="sm:text-4xl text-2xl font-bold drop-shadow"
            >
              Watch Movies and Tv Programmes
            </motion.h1>

            <motion.h2 variants={item} className="text-sm  my-6">
              watch anywhere cancel at anytime
            </motion.h2>
            <motion.form variants={item}>
              <input
                type="email"
                placeholder="Email Address"
                className="p-5 outline-none text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <motion.button
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.4 },
                }}
                whileTap={{ scale: 0.9 }}
                variants={item}
                className="bg-base-100 p-5"
                onClick={() => setSignUp(true)}
              >
                GET STARTED
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Login;
