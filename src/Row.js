import React, { useState, useEffect } from "react";
import axios from "./axios";
import './Row.css';

const base_Url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

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

  console.log(movies);
  return (
    <div className="row">
      {/* NETFLIX ORIGINA Trending Now 등등 가장 바깥 분류*/}
      <h2>{title}</h2>

      <div className="row_poster_container">
        {/* several row posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="row_poster"
            src={`${base_Url}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
