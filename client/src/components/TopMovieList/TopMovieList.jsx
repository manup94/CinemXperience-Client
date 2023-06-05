import { Col } from "react-bootstrap"
import TopMovieCard from "../TopMovieCard/TopMovieCard"


const TopMovieList = ({ movieData, moviesFetch }) => {


    return (
        movieData.map(elm => {
            return (
                <Col md={{ span: 3 }} key={elm.id}>
                    <TopMovieCard className="movies" movie={elm} moviesFetch={moviesFetch} />
                </Col>
            )
        })
    )
}

export default TopMovieList