import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "../axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import NProgress from "nprogress";
import ReactPaginate from "react-paginate";
import { useStateValue } from "../stateProvider";
import { StarIcon } from "@heroicons/react/solid";

const baseUrl = "https://image.tmdb.org/t/p/original";
function Row({ title, fetchUrl, itemsPerPage }) {
  const [{ page }, dispatch] = useStateValue();
  const [movies, setMovies] = React.useState([]);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = React.useState(1000);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(page);
  let [loading, setLoading] = useState(true);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  async function getMovies(num) {
    const request = await axios.get(`${fetchUrl}&page=${num}`);
    NProgress.start();
    setLoading(true);
    if (request.status === 200 || 201) {
      NProgress.done();
      setLoading(false);
    }
    setItems(request.data.total_pages);
    setMovies(request.data.results);
    const endOffset = itemOffset + itemsPerPage;

    setPageCount(Math.ceil((items * 10) / itemsPerPage));
    return request;
  }
  useEffect(() => {
    getMovies(page);
  }, [fetchUrl]);
  const handlePageClick = (event) => {
    NProgress.start();
    setLoading(true);
    const newOffset = (event.selected + 1 * itemsPerPage) % movies?.length;
    dispatch({
      type: "SET_PAGE",
      page: event.selected + 1,
    });
    getMovies(event.selected + 1);
    console.log(newOffset);
    // setItemOffset(newOffset);
    NProgress.done();
    setLoading(false);
  };
  const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  return (
    <div className="bg-base-200  mx-auto w-full">
      {" "}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 mx-auto rounded p-4">
        {loading ? (
          <BounceLoader
            color={"gray"}
            loading={loading}
            css={override}
            size={50}
          />
        ) : (
          movies?.map((mov, i) => {
            return (
              <div
                className="flex flex-col items-center bg-base-300 p-2 m-2"
                key={i}
              >
                <div className=" h-96  sm:mx-7 mx-11 my-8 sm:w-72 w-3/4 image-container relative">
                  {/* <LazyLoadImage
                 src=""
                 placeholder={}
                 /> */}
                  <Image
                    onLoad={() => setLoaded(true)}
                    src={`${baseUrl}${mov?.poster_path}`}
                    object-fit="contain"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      convertImage(700, 475)
                    )}`}
                    className={
                      !loaded
                        ? "space-x-6 rounded-[2.5rem] p-3 hover:scale-125 w-full sm:w-72 transition-all hover:opacity-50 hidden"
                        : "space-x-6 rounded-[2.5rem] p-3 hover:scale-125 w-full sm:w-72 transition-all hover:opacity-50"
                    }
                    onClick={() => {
                      mov.media_type === "tv"
                        ? router.push(`/series/${mov.id}`)
                        : router.push(`/MovieDet/${mov.id}`);
                    }}
                  />
                </div>

                <div></div>
                <p
                  className=" text-accent font-bold w-2/3 hover:text-red-500 sm:text-sm text:xl cursor-pointer"
                  onClick={() => {
                    mov.media_type === "tv"
                      ? router.push(`/series/${mov.id}`)
                      : router.push(`/MovieDet/${mov.id}`);
                  }}
                >
                  {mov?.title ||
                    mov?.original_title ||
                    mov?.name.substring(0, 26) + "..."}
                  {mov.release_date
                    ? `(${mov?.release_date?.substring(0, 4)})`
                    : mov.first_air_date
                    ? `(${mov?.first_air_date?.substring(0, 4)})`
                    : ""}
                </p>
                <div className="ml-52 text-sm text-secondary md:block hidden ">
                  <p className="flex">
                    <StarIcon className="w-4 mx-1" />
                    {mov?.vote_average}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        initialPage={page - 1}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        previousLabel="< previous"
        className="btn-group md:mx-72 my-10"
        previousLinkClassName="btn btn-outline"
        nextLinkClassName="btn btn-outline"
        activeLinkClassName="btn btn-active bg-indigo-700"
        pageLinkClassName="btn btn-outline"
      />
    </div>
  );
}

export default Row;
