import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import CircleLoader from "react-spinners/CircleLoader";
import { toast } from "react-toastify";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Sign({
  email,
  setEmail,
  title,
  reg,
  setSignUp,
  setSignIn,
}) {
  const [password, setPassword] = useState("");
  const [fp, setFp] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const router = useRouter();
  function timedAlert() {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 1400);
    setTimeout(() => {
      router.reload(window.location.pathname);
    }, 2400);
  }

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
  const alertError = (error) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const forgotPassword = (Email) => {
    sendPasswordResetEmail(auth, Email)
      .then(function () {
        timedAlert();
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  const register = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (email === "") {
      alertError("No email entered");
      setIsLoading(false);
    } else if (password === "") {
      alertError("No password entered");
      setIsLoading(false);
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // Signed in
        // ...
      })
      .catch((error) => {
        alertError(error?.message);
        setIsLoading(false);
        // ..
      });
  };
  const SignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (email === "") {
      alertError("No email entered");
      setIsLoading(false);
    } else if (password === "") {
      alertError("No password entered");
      setIsLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          // Signed in
          // ...
        })
        .catch((error) => {
          alertError(error?.message);
          setIsLoading(false);
        });
    }
  };
  return (
    <div className='bg-slate-800 p-7 sm:w-full max-w-[500px] rounded drop-shadow-lg shadow-lg'>
      {alert && (
        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className=' lg:absolute alert alert-success shadow-lg'>
          <motion.div variants={item}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='stroke-current flex-shrink-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>Please check your email...</span>
          </motion.div>
        </motion.div>
      )}
      <h1 className='text-2xl text-white font-bold'>
        {fp ? "Password reset" : title}
      </h1>
      <form className='flex flex-col'>
        <input
          type='email'
          className='p-5 outline-none my-4 rounded-md'
          placeholder='Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {fp ? (
          <button
            className='bg-teal-600 my-7 text-white rounded-bl-lg rounded-tr-lg hover:bg-teal-400 transition-all p-5'
            onClick={() => forgotPassword(email)}>
            Reset Password
          </button>
        ) : (
          <input
            type='Password'
            className='p-5 outline-none my-4 rounded-md'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        {reg ? (
          <>
            <button
              onClick={register}
              disabled={isLoading}
              className={`${
                isLoading ? "bg-gray-300" : "bg-teal-600"
              }  my-7 flex items-center justify-center text-white rounded-bl-lg rounded-tr-lg hover:bg-teal-400 transition-all p-5`}>
              {isLoading ? (
                <CircleLoader
                  color={color}
                  loading={isLoading}
                  cssOverride={override}
                  size={30}
                  aria-label='Loading Spinner'
                  data-testid='loader'
                />
              ) : (
                <p>Register</p>
              )}
            </button>
          </>
        ) : (
          <>
            {" "}
            {!fp && (
              <>
                <button
                  onClick={SignIn}
                  disabled={isLoading}
                  className={`${
                    isLoading
                      ? "bg-gray-300"
                      : "bg-teal-600"
                  }  my-7 flex items-center justify-center text-white rounded-bl-lg rounded-tr-lg hover:bg-teal-400 transition-all p-5`}>
                  {isLoading ? (
                    <CircleLoader
                      color={color}
                      loading={isLoading}
                      cssOverride={override}
                      size={30}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />
                  ) : (
                    <p>login</p>
                  )}
                </button>
              </>
            )}
            {!fp && (
              <p
                className='text-sm text-teal-600 cursor-pointer underline'
                onClick={() => setFp(true)}>
                Forgot pasword
              </p>
            )}
            <p className='text-sm text-gray-400'>
              New to JayMovies?
              <span
                className='ml-2 text-white cursor-pointer hover:text-gray-100 transition-all'
                onClick={() => {
                  setSignUp(true);
                  setSignIn(false);
                  setFp(false);
                }}>
                Sign Up now
              </span>
            </p>
          </>
        )}
      </form>
    </div>
  );
}

export default Sign;
