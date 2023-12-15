import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id: 1,
        image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
        Title: 'Inception',
        Description: 'A thief who enters the dreams of others to steal their secrets is given one last job.',
        Director: {
          Name: 'Christopher Nolan',
          Bio: 'Christopher Nolan is a British-American director, well known for his work in the action and superhero genres.'
        },
        Genre: {
          Name: 'Sci-Fi',
          Description: 'Science fiction movies explore futuristic and speculative concepts.'
        },
        Featured: true,
        ReleaseYear: 2010,
        Rating: 8.8
      },
      {
        id: 2,
        image: 'https://m.media-amazon.com/images/I/61jkTiX8NuL._AC_UF1000,1000_QL80_.jpg',
        Title: 'The Lion King',
        Description: 'A young lion prince flees his kingdom after the murder of his father and must learn to survive on the streets of the city.',
        Director: {
          Name: 'Roger Allers',
          Bio: 'Roger Allers is an American director known for his work in the animation and family genres.'
        },
        Genre: {
          Name: 'Animation',
          Description: 'Animation movies appeal to all ages with their vibrant characters and stories.'
        },
        Featured: false,
        ReleaseYear: 1994,
        Rating: 8.5
      },
      {
        id: 3,
        image: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
        Title: 'The Silence of the Lambs',
        Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
        Director: {
          Name: 'Jonathan Demme',
          Bio: 'Jonathan Demme was an American director known for his work in the crime and thriller genres.'
        },
        Genre: {
          Name: 'Thriller',
          Description: 'Thriller movies create suspense and excitement.'
        },
        Featured: false,
        ReleaseYear: 1991,
        Rating: 8.6
      }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movieData={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
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