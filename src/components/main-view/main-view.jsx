import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
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
import MovieList from "../movie-list/movie-list";
import MovieFilter from "../movie-filter/movie-filter";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies, setSearchFilter } from "../../redux/reducers/movies";
import { setUser, setToken } from "../../redux/reducers/user"


export default MainView = () => {

  const movies = useSelector((state) => state.movies.list)
  const dispatch = useDispatch();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const user = useSelector((state) => state.user.userObj)
  const token = useSelector(state => state.user.token);

  const loopArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  useEffect(() => {
    console.log("user:", user, "\n\nstoredUser:", storedUser, "\n\ntoken:", token, "\n\nstoredToken:", storedToken);

    // if (!user) {
    //   if (storedUser) {
    //     dispatch(setUser(storedUser))
    //   } else {
    //     console.log("uh oh no user");
    //   }
    // }

    if (storedUser) {
      dispatch(setUser(storedUser))
    }

    if (storedToken) {
      dispatch(setToken(storedToken))
    }

    if (!token) {
      return
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
            description: movie.Description,
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
      dispatch(setMovies(moviesFromApi))
    })
    console.timeEnd("promise all")

  }

  return (
    <BrowserRouter>
      <NavigationBar></NavigationBar>
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
                    <LoginView />
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
                  <ProfileView>
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
            path="/movies/:paramsMovieTitle"
            element={

              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>Loading movie...</div>
                ) : (

                  <MovieView
                    style={{ border: "1px solid green" }}
                  />

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
                    <MovieFilter />
                    {/* MOVIE PLACEHOLDERS */}
                    {loopArr.map((item, key) => (
                      <Col key={key} s={2} className="mb-5">
                        <MovieCardPlaceholder></MovieCardPlaceholder>
                      </Col>
                    ))}
                  </>
                ) : (
                  <>
                    <MovieList />
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