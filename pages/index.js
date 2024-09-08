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
  const [{ user, uid, darkmode }, dispatch] = useStateValue();


  return (
    <div
      data-theme={darkmode ? "halloween" : "cupcake"}
      className={"h-screen overflow-y-scroll bg-base-100"}
    >
      <Head>
        <title>JayMovies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div data-theme={darkmode ? "halloween" : "cupcake"}>
        <HomePage />
      </div>
    </div>
  );
}
