import PropTypes from "prop-types";
import "./movie-view.scss";
// import  from "react-bootstrap";

const MovieView = ({ movieData, onBackClick }) => {
  if (movieData.featured) {
    movieData.featured = "This movie is featured!";
  } else {
    movieData.featured = null;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center",alignItems: "center", flexDirection: "column" }}>
      <div>
        <div>
          <img className="movie-poster" src={movieData.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movieData.title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movieData.description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movieData.genre.Name}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movieData.director.Name}</span>
        </div>
        <div>
          <span>Release year: </span>
          <span>{movieData.releaseYear}</span>
        </div>
        <div>
          <span>Rating: </span>
          <span>{movieData.rating}</span>
        </div>
        <br />
        <div>
          <span><b>{movieData.featured}</b></span>
        </div>
        <br />
      </div>
      <button className="back-button" style={{ cursor: "pointer" }} onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movieData: PropTypes.shape({
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieView;
