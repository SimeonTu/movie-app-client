import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

const MovieCard = ({ movieData, onMovieClick }) => {

  if (typeof movieData == "string") {
    return (
      <div><i>No similar movies found</i></div>
    )
  }

  return (
    <Card className="h-100" onClick={() => onMovieClick(movieData)} style={{ width: "200px" }} >
      <Card.Img variant="top" src={movieData.image} />
      <Card.Body>
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.director.Name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  onMovieClick: PropTypes.func,
};

export default MovieCard;
