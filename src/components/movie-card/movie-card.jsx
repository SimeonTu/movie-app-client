import PropTypes from "prop-types";

const MovieCard = ({ movieData, onMovieClick }) => {

  if (typeof movieData == "string") {
    return (
      <div><i>No similar movies found</i></div>
    )
  }

  return (
    <div
      onClick={() => {
        onMovieClick(movieData);
      }}
    >
      {movieData.title}
    </div>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  onMovieClick: PropTypes.func,
};

export default MovieCard;
