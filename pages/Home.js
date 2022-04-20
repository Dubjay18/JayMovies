import React, { useEffect } from "react";
import Header from "../components/Header";
import Row from "../components/Row";
import requests from "../components/requests";
import ClipLoader from "react-spinners/ClipLoader";
import PulseLoader from "react-spinners/PulseLoader";
import BounceLoader from "react-spinners/BounceLoader";
import { useState } from "react";
import { css } from "@emotion/react";

function HomePage() {
  const [fetchUrl, setFetchUrl] = React.useState(requests.fetchTopRated);
  const [title, setTitle] = React.useState("Top Rated");
  let [loading, setLoading] = useState(true);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const load = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    const Url = () => {
      load();
      if (title === "Trending Now") {
        setFetchUrl(requests.fetchTrending);
      } else if (title === "Top Rated") {
        setFetchUrl(requests.fetchTopRated);
      } else if (title === "Action Movies") {
        setFetchUrl(requests.fetchActionMovies);
      } else if (title === "Comedy Movies") {
        setFetchUrl(requests.fetchComedynMovies);
      } else if (title === "Horror Movies") {
        setFetchUrl(requests.fetchHorrorMovies);
      } else if (title === "Romance Movies") {
        setFetchUrl(requests.fetchRomanceMovies);
      }
    };
    Url();
  }, [title]);

  return (
    <div>
      <Header />
      <div className="flex justify-between items-center mx-9">
        <h1 className="sm:text-4xl text-2xl text-white font-extrabold my-10">
          {title}
        </h1>
        <select
          className="bg-slate-800 shadow-xl text-white h-full p-4"
          name="movie fields"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        >
          <option value="Trending Now">Trending Now</option>
          <option value="Top Rated">Top Rated</option>
          <option value="Action Movies">Action Movies</option>
          <option onClick={load} value="Comedy Movies">
            Comedy Movies
          </option>
          <option value="Horror Movies">Horror Movies</option>
          <option value="Romance Movies">Romance Movies</option>
        </select>
      </div>

      <div className=" max-w-screen-xl flex flex-wrap mx-auto">
        {loading ? (
          <div className="p-6 shadow-md flex items-center justify-center ">
            <PulseLoader
              color={"gray"}
              loading={loading}
              css={override}
              size={50}
            />
          </div>
        ) : (
          <>
            <Row title={title} fetchUrl={fetchUrl} />
          </>
        )}
      </div>

      {/* <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedynMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} /> */}
    </div>
  );
}

export default HomePage;
