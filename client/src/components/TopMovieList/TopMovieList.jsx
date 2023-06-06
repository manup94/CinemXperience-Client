import { Col } from "react-bootstrap"
import TopMovieCard from "../TopMovieCard/TopMovieCard"


const TopMovieList = ({ movieData }) => {


    return (
        <>

            {
                movieData?.map(elm => {
                    return (
                        <Col md={{ span: 3 }} key={elm.id}>
                            <TopMovieCard className="movies" movie={elm} />
                        </Col>
                    )
                })

            }

        </>
    )
}

export default TopMovieList