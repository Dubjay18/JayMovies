import React, { useEffect } from "react";
import Header from "../components/Header";
import Row from "../components/Row";
import requests from "../components/requests";
import ClipLoader from "react-spinners/ClipLoader";
import PulseLoader from "react-spinners/PulseLoader";
import BounceLoader from "react-spinners/BounceLoader";
import { useState } from "react";
import { css } from "@emotion/react";
import { useStateValue } from "../stateProvider";
import Footer from "../components/Footer";

function HomePage() {
  const [{ title }, dispatch] = useStateValue();
  const [fetchUrl, setFetchUrl] = React.useState(
    requests.fetchTopRated
  );

  let [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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
  const changeSearch = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setFetchUrl(
      `${requests.fetchSearch}&query=${e.target[0].value}`
    );
    dispatch({
      type: "SET_PAGE",
      page: 1,
    });
  };
  // useEffect(())
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
    <div className='min-h-screen'>
      <Header />
      <div className='flex flex-wrap my-5 justify-between items-center mx-9'>
        <h1 className='sm:text-4xl text-2xl  font-extrabold font-poppins text-primary my-10'>
          <select
            className='select select-bordered text-primary bg-base-200 b'
            value={title}
            onChange={(e) => {
              dispatch({
                type: "SET_TITLE",
                title: e.target.value,
              });
              dispatch({
                type: "SET_PAGE",
                page: 1,
              });
            }}>
            <option value='Trending Now'>
              Trending Now
            </option>
            <option value='Top Rated'>Top Rated</option>
            <option value='Action Movies'>
              Action Movies
            </option>
            <option onClick={load} value='Comedy Movies'>
              Comedy Movies
            </option>
            <option value='Horror Movies'>
              Horror Movies
            </option>
            <option value='Romance Movies'>
              Romance Movies
            </option>
          </select>
        </h1>

        <form
          onSubmit={changeSearch}
          className='form-control'>
          <input
            type='text'
            placeholder='Search'
            className='input input-bordered text-primary bg-base-200 '
          />
          <button type='submit' className='hidden'>
            {" "}
            submit
          </button>
        </form>
      </div>

      <div className=' max-w-screen-2xl flex flex-wrap mx-auto'>
        {loading ? (
          <div className='p-6 shadow-md flex w-[100vw] items-center h-[60vh] justify-center '>
            <div className='mx-auto'>
              <PulseLoader
                color={"gray"}
                loading={loading}
                css={override}
                size={50}
              />
            </div>
          </div>
        ) : (
          <>
            <Row
              title={title}
              fetchUrl={fetchUrl}
              itemsPerPage={20}
            />
          </>
        )}
      </div>

<Footer />
    </div>
  );
}

export default HomePage;
