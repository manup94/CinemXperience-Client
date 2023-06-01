import { Col } from "react-bootstrap"
import MovieCard from "../MovieCard/MovieCard"


const MoviesList = ({ movieData, moviesFetch }) => {


    return (
        movieData.map(elm => {
            return (
                <Col md={{ span: 3 }} key={elm.id}>
                    <MovieCard className="movies" movie={elm} moviesFetch={moviesFetch} />

                </Col>
            )
        })
    )
}

export default MoviesList