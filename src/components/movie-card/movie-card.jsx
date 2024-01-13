import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom"

export default MovieCard = ({ movieData, onMovieClick }) => {

  // Case where the string: ["No similar movies found"] was returned by the Similar Movie check function instead of movie objects
  if (typeof movieData == "string") {
    return (
      <div><i>No similar movies found</i></div>
    )
  }

  return (
    <Link to={`/movies/${encodeURIComponent(movieData.title)}`}>
      <Card className="h-100" onClick={() => onMovieClick(movieData)} style={{ width: "200px" }} >
        <Card.Img variant="top" src={movieData.image} />
        <Card.Body>
          <Card.Title>{movieData.title}</Card.Title>
          <Card.Text>{movieData.director.Name}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.oneOfType([
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    PropTypes.string
  ]).isRequired,
  onMovieClick: PropTypes.func,
};