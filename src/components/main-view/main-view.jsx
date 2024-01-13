import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import NavigationBar from "../navigation-bar/navigation-bar"
import ProfileView from "../profile-view/profile-view"
import ChangeUsername from "../profile-view/change-username"
import ChangePassword from "../profile-view/change-password";
import ChangeEmail from "../profile-view/change-email";
import ChangeBirthday from "../profile-view/change-birthday";
import MovieCardPlaceholder from '../placeholders/movie-card-placeholder';
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const loopArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  useEffect(() => {
    if (!token) {
      return;
    }

    fetchData()

  }, [token]);

  async function fetchData() {
    let moviesFromApi = await fetch("https://ifdbase-c6a1086fce3e.herokuapp.com/movies", {
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

    // The Film Database API call options
    const TFDBoptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTI4MTNmMzRhNWFiYzdjYmU0YjE1NzZkMGIyYmY1MSIsInN1YiI6IjY1OGYzZmUwZDUxOTFmNmExZDI3MDcwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ybplmx9CH6yhdA36BEjUrppLyGMMPtjLxPy1cU-Z_c4'
      }
    };

    // Fetching movie posters from TFDB and adding them to each movie object, then setting the value of the "movies" state to the finished object
    console.time("promise all");
    return moviesFromApi = await Promise.all(moviesFromApi.map(async (movie) => {
      await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie.title}&language=en-US&page=1`, TFDBoptions)
        .then(response => response.json())
        .then(data => {
          movie.image = `http://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
        })
    })).then(() => {
      setMovies(moviesFromApi)
    })
    console.timeEnd("promise all")

  }

  function onMovieClick(newSelectedMovie) {
    setSelectedMovie(newSelectedMovie)
  }

  // Function to check for similar movies after a movie card is opened
  const similarMovies = (selectedMovie) => {
    if (selectedMovie == null) {
      return ["No similar movies found"]
    }

    //array of movies with the same genre
    let similarMoviesArr = movies.filter((movie) => {
      for (let i = 0; i < 3; i++) { //only show up to 3 movies
        if (
          movie.genre.Name == selectedMovie.genre.Name &&
          movie.title != selectedMovie.title
        ) return true;
      }
    })

    return similarMoviesArr
  }

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={() => {
        setUser(null)
        setToken(null)
        localStorage.clear()
      }} ></NavigationBar>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={

              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />

          <Route
            path="/login"
            element={

              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }} />
                  </Col>
                )}
              </>

            }
          />

          <Route
            path='profile'
            element={
              <>

                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView
                    user={user}
                    onLoggedOut={() => {
                      setUser(null)
                      setToken(null)
                      localStorage.clear()
                    }}
                    movieData={movies}
                    onMovieClick={onMovieClick}
                    token={token} >
                  </ProfileView>
                )}

              </>
            }
          >
            <Route
              path='change-username'
              element={
                <ChangeUsername></ChangeUsername>
              }
            />
            <Route
              path='change-password'
              element={
                <ChangePassword></ChangePassword>
              }
            />
            <Route
              path='change-email'
              element={
                <ChangeEmail></ChangeEmail>
              }
            />
            <Route
              path='change-birthday'
              element={
                <ChangeBirthday></ChangeBirthday>
              }
            />

            <Route path="*" element={<p>there was no match</p>} />
          </Route>

          <Route
            path="/movies/:title"
            element={

              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>Loading movie...</div>
                ) : (

                  <>
                    <Col className="my-auto" md={8}>
                      <MovieView
                        style={{ border: "1px solid green" }}
                        movieData={movies}
                        onBackClick={() => setSelectedMovie(null)}
                        user={user}
                        token={token}
                      />
                    </Col>
                    <hr />
                    <h2>Similar Movies</h2>
                    {similarMovies(selectedMovie).map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movieData={movie}
                        onMovieClick={onMovieClick}
                      />
                    ))}
                  </>

                )}
              </>

            }
          />

          <Route
            path="/"
            element={

              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <>
                    {loopArr.map((item, key) => (
                      <Col key={key} s={2} className="mb-5">
                        <MovieCardPlaceholder></MovieCardPlaceholder>
                      </Col>
                    ))}
                  </>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col key={movie.id} s={2} className="mb-5">
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
              </>

            }
          />

          <Route path="*" element={<p>there was no match</p>} />

        </Routes>
      </Row>
    </BrowserRouter >
  );
};