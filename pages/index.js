import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import { useEffect } from "react";

import Header from "../components/Header";
import requests from "../components/requests";
import Row from "../components/Row";
import { auth } from "../firebase";
import HomePage from "./Home";
import Login from "./Login";
import { useStateValue } from "./../stateProvider";

export default function Home() {
  const [{ user, uid }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        dispatch({
          type: "SET_USER",
          user: userCred.email,
        });
        dispatch({
          type: "SET_UID",
          uid: userCred.uid,
        });
        console.log(userCred);
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "SET_UID",
          uid: null,
        });
      }
    });
    return unsubscribe;
  }, [dispatch]);

  if (!user) {
    return <Login />;
  }
  return (
    <div className="h-screen overflow-y-scroll bg-slate-800">
      <Head>
        <title>JayMovies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <HomePage />
      </div>
    </div>
  );
}
