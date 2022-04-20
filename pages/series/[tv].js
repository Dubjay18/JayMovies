import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../../axios";
import Image from "next/image";
import Header from "../../components/Header";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Series() {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const [genres, setGenres] = React.useState([]);
  const [movie, setMovie] = React.useState([]);
  const [trailerUrl, setTrailerUrl] = React.useState("");
  const router = useRouter();
  const opts = {
    height: "390",
    width: "100%",
    playersVars: {
      autoplay: 1,
    },
  };
  const { tv } = router.query;
  const API_KEY = "c7ad2f9f56b2f7935e7da5cf937bba66";
  useEffect(() => {
    axios
      .get(`/tv/${tv}?api_key=${API_KEY}&languages=en-US`)
      .then((res) => {
        setMovie(res.data);
        console.log(res.data);
        if (res.data.genres) {
          setGenres(res.data.genres);
        }
      })
      .catch((err) => console.log(err));

    movieTrailer(null, { tmdbId: tv })
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
  }, [tv]);

  return (
    <div className="bg-black  w-full ">
      <Header />
      <div className="max-w-screen-md mx-auto p-10 bg-slate-900">
        <h1 className="text-white sm:text-5xl text-2xl font-bold mb-9">
          {movie?.title || movie?.original_title || movie?.name}
          {movie.first_air_date
            ? `(${movie?.first_air_date?.substring(0, 4)})`
            : ""}
        </h1>
        <LazyLoadImage
          src={`${baseUrl}${movie?.poster_path || movie?.backdrop_path}`}
          className="w-full"
          height={700}
        />
        {
          <p className="flex sm:text-xl font-medium text-white my-6">
            <span className="underline">Genre: </span>
            {genres.map((e, i) => {
              return (
                <span className="ml-2" key={i}>
                  {e.name}
                  {i === genres.length - 1 ? "." : ","}
                </span>
              );
            })}
          </p>
        }
        <p className="sm:text-xl  italic text-white mb-6">
          <span className="underline font-medium">Details</span>:{" "}
          {movie?.overview}
        </p>
        {trailerUrl ? (
          <YouTube videoId={trailerUrl} opts={opts} />
        ) : (
          <h1 className=" italic font-thin text-white">
            Trailer not avaliable
          </h1>
        )}
      </div>
    </div>
  );
}

export default Series;
