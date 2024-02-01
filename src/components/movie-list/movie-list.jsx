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
            ) : filteredMovies.length > 0 && typeof filteredMovies == "object" ? (
                filteredMovies.map((movie) => (
                    <Col key={movie.id} s={2} className="mb-5">
                        <MovieCard
                            key={movie.id}
                            movieData={movie}
                        />
                    </Col>
                ))
            ) : filteredMovies == "no movies found" ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "150px" }}>
                    <span style={{ color: "gray", opacity: "0.5", fontSize: "2rem" }}>
                        <i><u>Nothing but crickets here...</u></i>
                    </span>
                </div>
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