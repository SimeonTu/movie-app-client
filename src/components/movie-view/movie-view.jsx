import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Placeholder, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

export default MovieView = ({ onMovieClick }) => {

  const user = useSelector((state) => state.user.userObj)
  const token = useSelector(state => state.user.token);

  const movies = useSelector((state) => state.movies.list)
  const { paramsMovieTitle } = useParams();
  const navigate = useNavigate();

  const currentMovie = movies.find((movie) => movie.title === paramsMovieTitle);
  const [movieFavorited, setMovieFavorited] = useState(null);
  const [similarMovies, setSimilarMovies] = useState("");

  useEffect(() => {

    setMovieFavorited(null)

    // if (user) {

    //   console.log(user);

    //   // Getting user info
    //   fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}`, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    //   })
    //     .then((response) => {
    //       return response.json()
    //     })
    //     .then((data) => {

    // console.log(user.FavoriteMovies)
    if (user.FavoriteMovies.includes(currentMovie.id)) {
      console.log("user has movie in their favs:")
      setMovieFavorited(true)
      console.log("moviefavorited:", movieFavorited);
    } else {
      setMovieFavorited(false)
      console.log("moviefavorited:", movieFavorited);
    }
    // })
    // }

    if (movies.length > 0) {
      console.log("yessir");
      console.log(movies);
      let similarMoviesArr = movies.filter((movie) => {
        for (let i = 0; i < 3; i++) { //only show up to 3 movies
          if (
            movie.genre.Name == currentMovie.genre.Name &&
            movie.title != currentMovie.title
          ) {
            console.log("matched!!");
            return true;
          }
        }
      })
      setSimilarMovies(similarMoviesArr)
      console.log(similarMoviesArr);
      //array of movies with the same genre

    }

  }, [user, currentMovie])


  const addToast = () => {
    toast.success(<p className="m-0">You've successfully added <b>{currentMovie.title}</b> to your favorites!<br />
      You can view your favorite movies from your <u><b><a style={{ cursor: "pointer" }} onClick={() => navigate("/profile")}>profile</a></b></u>.</p>, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  const removeToast = () => {
    toast.success(<p className="m-2">You've successfully removed <b>{currentMovie.title}</b> from your favorites!<br />
      You can view your favorite movies from your <u><b><a style={{ cursor: "pointer" }} onClick={() => navigate("/profile")}>profile</a></b></u>.</p>, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  function addToFavs() {

    fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}/movies/${currentMovie.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("movie added to favorites:", data)
        setMovieFavorited(true)
        addToast()
      })

  }

  function removeFromFavs() {

    fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}/movies/${currentMovie.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("movie removed to favorites:", data)
        setMovieFavorited(false)
        removeToast()
      })

  }

  return (

    <Col className="my-auto" md={8} style={{ display: "flex", flexDirection: "column", width: "100vw" }}>

      <ToastContainer />

      <div className="m-2 p-5 rounded" style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(46, 139, 87, .05)", border: "2px solid rgba(46, 139, 87, .5)", width: "100%" }}>

        <div style={{ width: "280px", boxShadow: "0 0 30px rgba(0,0,0,0.25)" }}>
          <img style={{ width: "100%" }} className="movie-poster rounded" src={currentMovie.image} />
        </div>

        <div className="ms-5" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <span style={{ color: "SeaGreen" }}>
            <h2>
              {currentMovie.title}
            </h2>
          </span>

          <span style={{ width: "350px" }}>{currentMovie.description}</span>

          {
            currentMovie.featured ? (
              <>
                <div className="mt-2" style={{ color: "SeaGreen", }}>
                  <i>
                    <span>
                      <b>This movie is featured!</b>
                      <FontAwesomeIcon className="ms-2" icon={icon({ name: 'star', family: 'classic', style: 'solid' })} />
                    </span>
                  </i>
                </div>
              </>
            ) : (
              null
            )
          }

          <span className="mt-2"><b>Genre:</b> {currentMovie.genre.Name}</span>

          <span><b>Director:</b> {currentMovie.director.Name}</span>

          <span><b>Release year:</b> {currentMovie.releaseYear}</span>

          <span><b>Rating:</b> {currentMovie.rating}</span>

          {
            movieFavorited == true ? (
              <a className="mb-3 mt-3" style={{ cursor: "pointer" }} onClick={removeFromFavs}>
                <p className="m-0">
                  <FontAwesomeIcon className="pe-1" style={{ color: "red" }} size="xl" icon={solid("heart")} />
                  Remove from favorites
                </p>
              </a>
            ) : movieFavorited == false ? (
              <a className="mb-3 mt-3" style={{ cursor: "pointer" }} onClick={addToFavs}>
                <p className="m-0">
                  <FontAwesomeIcon className="pe-1" size="xl" icon={regular("heart")} />
                  Add to favorites
                </p>
              </a>
            ) : (
              <div className="mb-3 mt-3">
                <Placeholder as={"p"} animation="wave" style={{ display: "flex", width: "150px", justifyContent: "center", alignItems: "center" }} className="m-0">
                  <FontAwesomeIcon className="pe-1" style={{ opacity: "0.25", color: "SeaGreen" }} size="xl" icon={solid("heart")} />
                  <Placeholder style={{ width: "100%", height: "10px", opacity: "0.25", color: "SeaGreen" }} />
                </Placeholder>
              </div>
            )
          }

          <Button
            variant="primary"
            className="back-button mb-3"
            style={{ cursor: "pointer", width: "max-content" }}
            onClick={() => { navigate("/") }}>
            Back
          </Button>


        </div>

      </div>


      <Card className="p-0 mt-4" style={{}} >
        <Card.Header>
          <h4 className="mb-1 mt-1">You might also like</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            {similarMovies.length == 0 ? (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "235px" }}>
                <span style={{ color: "gray", opacity: "0.5", fontSize: "2rem" }}>
                  <i><u>Nothing but crickets here...</u></i>
                </span>
              </div>
            ) : (
              <>
                {
                  similarMovies.map((movie) => (
                    <Col key={movie.id} md={3} className="mb-5">
                      <MovieCard
                        key={movie.id}
                        movieData={movie}
                        onMovieClick={onMovieClick}
                      />
                    </Col>
                  ))
                }
              </>
            )}
          </Row>
        </Card.Body>
      </Card>

    </Col >

  );
};

MovieView.propTypes = {
  movieData: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      featured: PropTypes.bool,
      director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
      }),
      genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string,
      }),
      author: PropTypes.string,
    }),
    PropTypes.array
  ]).isRequired
};