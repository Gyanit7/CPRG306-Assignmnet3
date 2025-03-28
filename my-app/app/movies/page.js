"use client";
import { useState, useEffect } from "react";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Movie List</h1>
      <ul className="mt-4">
        {movies.map((movie) => (
          <li key={movie.id} className="border-b p-2">
            <strong>{movie.title}</strong> ({movie.releaseYear})
            <p>Actors: {movie.actors.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
