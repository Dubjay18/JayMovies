import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useRouter } from "next/router";
import requests from "./requests";

const Banner = () => {
  const [Movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const opts = {
    height: "390",
    width: "100%",
    playersVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <header
        className="banner mt-5 h-full"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}")`,
        }}
      >
        <div className="banner__contents">
          {/* title  */}
          <h1 className="banner__title">
            {Movie?.title || Movie?.name || Movie?.original_name}
          </h1>
          {/* div 2 buttons  */}
          <div className="banner__buttons">
            <button
              className="banner__button"
              onClick={() => router.push(`/MovieDet/${Movie.id}`)}
            >
              Open
            </button>
            <button className="banner__button">My List</button>
          </div>
          <h1 className="banner__description">
            {truncate(Movie?.overview, 150)}
          </h1>
          <div className="banner__fadeBottom "></div>
        </div>
      </header>
    </>
  );
};

export default Banner;
