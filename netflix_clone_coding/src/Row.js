import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css"

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  // A snippet of code which runs based on a specific condition/varaible
  useEffect(() => {
    // if [], run once when the row loads, and dont run again

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //App.js의 fetchUrl
      // ex) https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213


      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // [fetchUrl]은 useEffect에게 block 밖에 있는 variable를 쓰고있다고 알려주는것
  // 여기서 Url은 계속 바뀌니까 바뀔 때 마다 알려주는건가?

  console.table(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Row