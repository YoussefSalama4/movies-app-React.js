import MovieItem from "./MovieItem";

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem
          onSelectMovie={onSelectMovie}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
