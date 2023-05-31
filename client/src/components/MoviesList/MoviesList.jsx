import { Col } from "react-bootstrap"
import MovieCard from "../MovieCard/MovieCard"


const MoviesList = ({ movieData, moviesFetch }) => {


    return (
        movieData.map(elm => {
            return (
                <Col md={{ span: 4 }} key={elm._id}>
                    <MovieCard className="movies" movie={elm} moviesFetch={moviesFetch} />

                </Col>
            )
        })
    )
}

export default MoviesList