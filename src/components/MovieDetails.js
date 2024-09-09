import { useState, useEffect, useRef } from "react";
import StarRating from "./starRating";
import Loader from "./Loader";
import { useKey } from "../useKey";

const KEY = "c5bfc36f";
export default function MovieDetails({
  selectedID,
  onCloseMovie,
  onAddWatched,
  watchedList,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const test = useRef(null);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]) || 0,
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  const isWatched = watchedList.find((el) => el.imdbID === selectedID);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
      console.log(test.current);
      if (test.current) {
        test.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [selectedID]
  );
  useKey(onCloseMovie, "Escape");

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`}></img>

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime || 0}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section ref={test}>
            <div className="rating">
              {isWatched ? (
                <p style={{ textAlign: "center" }}>
                  You rated this movie with {isWatched.userRating} ⭐{" "}
                </p>
              ) : (
                <>
                  <StarRating
                    onSetRating={setUserRating}
                    key={title}
                    maxRating={10}
                    size={24}
                  />
                  {userRating >= 1 && !isWatched && (
                    <button onClick={handleAdd} className="btn-add">
                      + Add to the list
                    </button>
                  )}
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
