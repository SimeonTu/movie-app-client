
import { Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredMovies } from "../../redux/reducers/movies";


export function MovieFilter() {

    const dispatch = useDispatch()

    const movies = useSelector((state) => state.movies.list);

    function handleChange(e) {

        let filteredMov = movies.filter((movie) => {
            if (movie.title.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) {
                console.log("movie matched")
                return movie
            }
        })

        console.log("\n\nfilteredMovies value:", filteredMov, "\n\ntype of filmov:", typeof filteredMov);

        if (filteredMov.length != 0) {
            console.log("yep");
            dispatch(setFilteredMovies(filteredMov))
        } else {
            console.log("nope");
            dispatch(setFilteredMovies("no movies found"))
        }
    }


    return (
        <Row>
            <Form className="mt-2 mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    onChange={handleChange}

                />
            </Form>
        </Row>
    )
}