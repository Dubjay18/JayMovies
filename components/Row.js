import Image from "next/image";
import React, { useEffect } from "react";
import axios from "../axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";
const baseUrl = "https://image.tmdb.org/t/p/original";
function Row({ title, fetchUrl }) {
  const [movies, setMovies] = React.useState([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  return (
    <div className="flex flex-wrap mx-auto bg-slate-700 shadow-white shadow-lg rounded p-4">
      {movies.map((mov, i) => {
        return (
          <div className="flex flex-col items-center" key={i}>
            <LazyLoadImage
              src={`${baseUrl}${mov.poster_path}`}
              object-fit="contain"
              width={170}
              height={400}
              className="space-x-6 p-3 hover:scale-75 w-full sm:w-52 transition-all hover:opacity-50"
              onClick={() => {
                mov.media_type === "tv"
                  ? router.push(`/series/${mov.id}`)
                  : router.push(`/MovieDet/${mov.id}`);
              }}
            />
            <p className=" text-sky-500 w-2/3 hover:text-red-500 sm:text-sm text:xl cursor-pointer">
              {mov?.title || mov?.original_title || mov?.name}
              {mov.release_date
                ? `(${mov?.release_date?.substring(0, 4)})`
                : ""}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Row;
