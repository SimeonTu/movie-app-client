import { MovieCard } from "../movie-card/movie-card";
import { MovieFilter } from "../movie-filter/movie-filter";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";

export const MovieList = () => {

    const movies = useSelector((state) => state.movies.list);
    const filteredMovies = useSelector((state) => state.movies.filteredMovies)

    return (
        <>
            <MovieFilter />

            {movies.length === 0 ? (
                <Col>The list is empty!</Col>
            ) : filteredMovies.length != 0 ? (
                filteredMovies.map((movie) => (
                    <Col key={movie.id} s={2} className="mb-5">
                        <MovieCard
                            key={movie.id}
                            movieData={movie}
                        />
                    </Col>
                ))
            ) : filteredMovies == "no movies found" ? (
                <div>No movies found.</div>
            ) : (
                <>
                    {
                        movies.map((movie) => (
                            <Col key={movie.id} s={2} className="mb-5">
                                <MovieCard
                                    key={movie.id}
                                    movieData={movie}
                                />
                            </Col>
                        ))
                    }
                </>
            )}
        </>
    );
};