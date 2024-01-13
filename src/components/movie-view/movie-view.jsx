import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Placeholder, Toast } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import "./movie-view.scss";

export default MovieView = ({ movieData, onBackClick, user, token }) => {

  const { title } = useParams();

  const movie = movieData.find((movie) => movie.title === title);
  const [movieFavorited, setMovieFavorited] = useState(null);
  const [showToastAdd, setShowToastAdd] = useState(false);
  const [showToastRemove, setShowToastRemove] = useState(false);

  function addToFavs() {

    fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("movie added to favorites:", data)
        setMovieFavorited(true)
        setShowToastRemove(false)
        setShowToastAdd(true)
      })

  }

  function removeFromFavs() {

    fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("movie removed to favorites:", data)
        setMovieFavorited(false)
        setShowToastAdd(false)
        setShowToastRemove(true)
      })

  }

  useEffect(() => {

    // Getting user info
    fetch(`https://fathomless-everglades-10625-ad628eacb5b5.herokuapp.com/https://ifdbase-c6a1086fce3e.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {

        // console.log(user.FavoriteMovies)
        if (data.FavoriteMovies.includes(movie.id)) {
          console.log("user has movie in their favs:", data)
          setMovieFavorited(true)
        } else {
          setMovieFavorited(false)
        }
      })



  }, [])

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <div>
        <div>
          <img className="movie-poster" src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre.Name}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director.Name}</span>
        </div>
        <div>
          <span>Release year: </span>
          <span>{movie.releaseYear}</span>
        </div>
        <div>
          <span>Rating: </span>
          <span>{movie.rating}</span>
        </div>

        {
          movie.featured ? (
            <>
              <div>
                <span><b>This movie is featured!</b></span>
              </div>
            </>
          ) : (
            null
          )
        }

      </div>

      {movieFavorited == true ? (
        <a className="mb-3 mt-2" style={{ cursor: "pointer" }} onClick={removeFromFavs}>
          <p className="m-0">
            <FontAwesomeIcon className="pe-1" style={{ color: "red" }} size="xl" icon={solid("heart")} />
            Remove from favorites
          </p>
        </a>
      ) : movieFavorited == false ? (
        <a className="mb-3 mt-2" style={{ cursor: "pointer" }} onClick={addToFavs}>
          <p className="m-0">
            <FontAwesomeIcon className="pe-1" size="xl" icon={regular("heart")} />
            Add to favorites
          </p>
        </a>
      ) : (
        <div className="mb-3 mt-2">
          <Placeholder as={"p"} animation="wave" style={{ display: "flex", width: "150px", justifyContent: "center", alignItems: "center" }} className="m-0">
            <FontAwesomeIcon className="pe-1" style={{ opacity: "0.25", color: "SeaGreen" }} size="xl" icon={solid("heart")} />
            <Placeholder style={{ width: "100%", height: "10px", opacity: "0.25", color: "SeaGreen" }} />
          </Placeholder>
        </div>
      )}


      <Link to={"/"}>
        <Button variant="primary" className="back-button mb-3" style={{ cursor: "pointer" }} onClick={onBackClick}>Back</Button>
      </Link>

      <Toast style={{ position: "fixed", transform: "translateY(-225px)" }} bg={"success"} onClose={() => setShowToastAdd(false)} show={showToastAdd} delay={3000} autohide>
        <Toast.Header>
          <FontAwesomeIcon className="pe-1" icon={solid("check")} />
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body style={{ color: "white" }}>You've <b>added</b> {movie.title} to your favorites.</Toast.Body>
      </Toast>

      <Toast style={{ position: "fixed", transform: "translateY(-225px)" }} bg={"success"} onClose={() => setShowToastRemove(false)} show={showToastRemove} delay={3000} autohide>
        <Toast.Header>
          <FontAwesomeIcon className="pe-1" icon={solid("check")} />
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body style={{ color: "white" }}>You've <b>removed</b> {movie.title} from your favorites.</Toast.Body>
      </Toast>

    </div >

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