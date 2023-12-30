import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import { Row, Col, Button } from "react-bootstrap";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    async function fetchData() {
      const moviesFromApi = await fetch("https://ifdbase-c6a1086fce3e.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          return data.map((movie) => {
            return {
              id: movie._id,
              title: movie.Title,

              genre: movie.Genre,
              director: movie.Director,
              releaseYear: movie.ReleaseYear,
              rating: movie.Rating,
              featured: movie.Featured,
            };
          });
        });

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTI4MTNmMzRhNWFiYzdjYmU0YjE1NzZkMGIyYmY1MSIsInN1YiI6IjY1OGYzZmUwZDUxOTFmNmExZDI3MDcwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ybplmx9CH6yhdA36BEjUrppLyGMMPtjLxPy1cU-Z_c4'
        }
      };

      moviesFromApi.map((movie) => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${movie.title}&language=en-US&page=1`, options)
          .then(response => response.json())
          .then(data => {
            movie.image = `http://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
          })
      })


      console.log(moviesFromApi);

      setMovies(moviesFromApi);

    }

    fetchData()

  }, [token]);

  // Function to check for similar movies after a movie card is opened
  const similarMovies = (selectedMovie) => {

    //array of movies with the same genre
    let similarMoviesArr = movies.filter((movie) => {
      for (let i = 0; i < 3; i++) { //only show up to 3 movies
        if (
          movie.genre.Name == selectedMovie.genre.Name &&
          movie.title != selectedMovie.title
        ) return true;
      }
    })

    if (!similarMoviesArr.length) {
      return ["No similar movies found"]
    } else {
      return similarMoviesArr
    }

  }

  return (
    <Row className="justify-content-md-center">
      {!user ? (

        <Col md={5}>
          <b>Login</b>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          <br></br>
          <b>Register</b>
          <SignupView />
        </Col>


      ) : selectedMovie ? (

        <>
          <Col className="my-auto" md={8} style={{ border: "1px solid black" }}>
            <MovieView
              style={{ border: "1px solid green" }}
              movieData={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
          <hr />
          <h2>Similar Movies</h2>
          <div>
            {similarMovies(selectedMovie).map((movie) => (
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

      ) : movies.length === 0 ? (

        <div>The list is empty!</div>

      ) : (

        // Main view with book list
        <>
          <Row className="justify-content-md-end">
            <Button style={{ width: "150px", height: "40px" }} variant="secondary" onClick={() => {
              setUser(null)
              setToken(null)
              localStorage.clear()
            }}
            >Logout
            </Button>
          </Row>
          {movies.map((movie) => (
            <Col key={movie.id} md={3}>
              <MovieCard
                key={movie.id}
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}

    </Row>
  );
};

export default MainView;