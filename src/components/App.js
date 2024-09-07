import { useState } from "react";
import NavBar from "./NavBar";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";
import Main from "./Main";
import MovieList from "./MovieList";
import Box from "./Box";
import MovieDetails from "./MovieDetails";
import Loader from "./Loader";
import Summary from "./Summary";
import WatchedMoviesList from "./WatchedMovieList";
import ErrorMessage from "./ErrortMessage";
import { useMovies } from "../useMovies";
import { useLocalStorageState } from "../useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedID, setSelectedID] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");
  // const [watched, setWatched] = useState([]);
  // const [watched, setWatched] = useState(function () {
  //   const watchedMovies = JSON.parse(localStorage.getItem("watched"));

  //   return watchedMovies;
  // });

  function handleSelectMovie(ID) {
    setSelectedID((selectedID) => (ID === selectedID ? null : ID));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }
  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar movies={movies}>
        <Logo />
        <Search
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          setQuery={setQuery}
        />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              onCloseMovie={handleCloseMovie}
              selectedID={selectedID}
              onAddWatched={handleAddWatched}
              watchedList={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
