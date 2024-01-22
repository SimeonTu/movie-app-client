import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

export const MovieCard = ({ movieData }) => {

  const navigate = useNavigate()

  return (
    <Card
      className="h-100"
      onClick={() => navigate(`/movies/${encodeURIComponent(movieData.title)}`)}
      style={{ cursor: "pointer", width: "200px" }} >

      <Card.Img variant="top" src={movieData.image} />
      <Card.Body style={{ height: "max-content" }}>
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.director.Name}</Card.Text>
      </Card.Body>
    </Card>
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