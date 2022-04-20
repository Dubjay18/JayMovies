import Head from "next/head";

import Header from "../components/Header";
import requests from "../components/requests";
import Row from "../components/Row";
import HomePage from "./Home";

export default function Home() {
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
