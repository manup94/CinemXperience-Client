import { Col } from "react-bootstrap"
import TopMovieCard from "../TopMovieCard/TopMovieCard"

const TopMovieList = ({ movies }) => {

    return (
        <>
            {
                movies?.map(elm => {
                    return (
                        <Col md={{ span: 3 }} key={elm.id}>
                            <TopMovieCard className="movies" {...elm} />
                        </Col>
                    )
                })

            }
        </>
    )
}

export default TopMovieList