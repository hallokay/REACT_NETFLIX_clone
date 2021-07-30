import React, { useState, useEffect } from "react";
import axios from "../axios";
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_Url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);

      return request;
      // fetch(axios.get(Url))
      // .then(res => res.json())
      // .then(data => {
      //     console.log(data);
      // })
    }
    fetchData();
  }, [fetchUrl]);


  const opts = {
    height: "390",
    width: "100%",
    playerVars: {

      autoplay: 1,
    },   
  };

  const handleClick = (movie) => {
    if(trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || "")
      .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));

      })
      .catch(error => console.log(error))
    }
  }

  return (
    <div className="row">
      {/* NETFLIX ORIGINA Trending Now 등등 가장 바깥 분류*/}
      <h2>{title}</h2>

      <div className="row_poster_container">
        {/* several row posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_Url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
    </div>
  );
};

export default Row;
