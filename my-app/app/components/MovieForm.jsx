'use client'

import { useState, useEffect } from 'react'; // Ensure useEffect and useState are imported
import Button from './Button'; // Import the Button component

const MovieForm = ({ onSubmit, movie = null, onCancel, formRef }) => {
  const [title, setTitle] = useState("");
  const [actors, setActors] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  // Update form fields if a movie is being edited
  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setActors(movie.actors.join(", "));
      setReleaseYear(movie.releaseYear);
    } else {
      setTitle("");
      setActors("");
      setReleaseYear("");
    }
  }, [movie]); // This will run every time `movie` changes (on edit)

  const handleSubmit = (e) => {
    e.preventDefault();
    const movieData = {
      title,
      actors: actors.split(",").map((actor) => actor.trim()),
      releaseYear,
    };
    onSubmit(movieData); // Call the submit handler
    setTitle(""); // Clear fields after submit
    setActors("");
    setReleaseYear("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-4xl mx-auto" // Increased max-width to make it wider
      ref={formRef} // Set formRef here to scroll to it
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-4 border rounded-md" // Increased padding for wider input fields
      />
      <input
        type="text"
        placeholder="Actors (comma separated)"
        value={actors}
        onChange={(e) => setActors(e.target.value)}
        required
        className="w-full p-4 border rounded-md" // Increased padding for wider input fields
      />
      <input
        type="number"
        placeholder="Release Year"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        required
        className="w-full p-4 border rounded-md" // Increased padding for wider input fields
      />

      {/* Submit button */}
      <Button
        type="submit"
        text={movie ? "Update Movie" : "Add Movie"}
        className="w-full py-3 bg-blue-500 text-white rounded-md"
      />

      {/* Only show cancel button if a movie is being edited */}
      {movie && (
        <Button
          type="button"
          text="Cancel"
          onClick={onCancel}
          className="w-full py-3 bg-red-500 text-white rounded-md"
        />
      )}
    </form>
  );
};

export default MovieForm;
