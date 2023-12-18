import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://ifdbase-c6a1086fce3e.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: `https://i0.wp.com/capri.org.au/wp-content/uploads/2017/10/poster-placeholder.jpg?ssl=1`,
            genre: movie.Genre,
            director: movie.Director,
            releaseYear: movie.ReleaseYear,
            rating: movie.Rating,
            featured: movie.Featured,
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {

    let similarMovies = movies.filter((movie) => { //array of movies with the same genre
      for (let i = 0; i < 3; i++) { //only show up to 3 movies
        if (
          movie.genre.Name == selectedMovie.genre.Name &&
          movie.title != selectedMovie.title
        ) {
          return true;
        }
      }
    });

    // if (similarMovies.length > 3) {
    //   similarMovies = similarMovies.slice(0, 4);
    // }

    if (!similarMovies.length) {
      similarMovies = ["No similar movies found"]
    }

    console.log(similarMovies);

    return (
      <>
        <MovieView
          movieData={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <h2>Similar Movies</h2>
        <div>
          {similarMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieData={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </div>
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

export default MainView;
