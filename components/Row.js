import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "../axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";
import requests from "./requests";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import NProgress from "nprogress";
import ReactPaginate from "react-paginate";
const baseUrl = "https://image.tmdb.org/t/p/original";
function Row({ title, fetchUrl, itemsPerPage }) {
  const [movies, setMovies] = React.useState([]);
  const router = useRouter();
  const nums = [1, 2, 3, 4, 5, 6, 7, 8];
  const [currentItems, setCurrentItems] = React.useState();
  const [items, setItems] = React.useState(1000);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(1);
  let [loading, setLoading] = useState(true);
  const [pos, setPos] = useState(1);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  async function next(e) {
    console.log(e);
    setPos(e);
    const request = await axios.get(`${fetchUrl}&page=${pos}`);
    NProgress.start();
    setLoading(true);
    if (request.status === 200 || 201) {
      NProgress.done();
      setLoading(false);
    }
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    setPageCount(Math.ceil((items * 10) / itemsPerPage));
    setMovies(request?.data?.results);
    return request;
  }
  // useEffect(() => {}, [third]);

  useEffect(() => {
    const arr = [];
    async function fetchData() {
      const request = await axios.get(`${fetchUrl}&page=1`);
      NProgress.start();
      setLoading(true);
      if (request.status === 200 || 201) {
        NProgress.done();
        setLoading(false);
      }
      setItems(request.data.total_pages);
      setMovies(request.data.results);
      console.log(request.data.results);
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(movies);
      setPageCount(Math.ceil((items * 10) / itemsPerPage));
      return request;
    }
    // async function fetchTest() {
    //   // nums.forEach(async function (e) {
    //   //   const request = await axios.get(`${fetchUrl}&page=${e}`);
    //   //   console.log(e);
    //   //   const res = request?.data?.results;
    //   //   // arr.push(...res[0]);
    //   //   // console.log(...res);
    //   //   console.log(res);
    //   //   if (res) {
    //   //     setItems([...res, ...items]);
    //   //   }
    //   // });

    //   const request = await axios.get(`${fetchUrl}&page=${pos}`);
    //   setItems(request.data.results);

    //   return request;
    // }

    fetchData();
    // fetchTest();
    console.log(pageCount);
    // console.log(items);
  }, []);
  const handlePageClick = (event) => {
    NProgress.start();
    setLoading(true);
    const newOffset = (event.selected + 1 * itemsPerPage) % movies?.length;

    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    next(event.selected + 1);
    setItemOffset(newOffset);
    // NProgress.done();
    setLoading(false);
  };
  return (
    <div className="dark:bg-base-200 bg-slate-50 mx-auto w-full">
      {" "}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
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
      <div className="flex flex-wrap mx-auto dark:bg-base-200 bg-slate-50  shadow-lg rounded p-4">
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
              <div className="flex flex-col items-center" key={i}>
                <LazyLoadImage
                  src={`${baseUrl}${mov.poster_path}`}
                  object-fit="contain"
                  className="space-x-6 rounded-[2.5rem] p-3 hover:scale-75 w-full sm:w-72 transition-all hover:opacity-50"
                  onClick={() => {
                    mov.media_type === "tv"
                      ? router.push(`/series/${mov.id}`)
                      : router.push(`/MovieDet/${mov.id}`);
                  }}
                />
                <p
                  className=" text-sky-500 font-medium w-2/3 hover:text-red-500 sm:text-sm text:xl cursor-pointer"
                  onClick={() => {
                    mov.media_type === "tv"
                      ? router.push(`/series/${mov.id}`)
                      : router.push(`/MovieDet/${mov.id}`);
                  }}
                >
                  {mov?.title || mov?.original_title || mov?.name}
                  {mov.release_date
                    ? `(${mov?.release_date?.substring(0, 4)})`
                    : mov.first_air_date
                    ? `(${mov?.first_air_date?.substring(0, 4)})`
                    : ""}
                </p>
              </div>
            );
          })
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        previousLabel="< previous"
        className="btn-group mx-64 my-10"
        previousLinkClassName="btn btn-outline"
        nextLinkClassName="btn btn-outline"
        activeLinkClassName="btn btn-active bg-indigo-700"
        pageLinkClassName="btn btn-outline"
      />
    </div>
  );
}

export default Row;
