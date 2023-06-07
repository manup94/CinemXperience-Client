import { Col } from "react-bootstrap"
import PassCard from "../PassCard/PassCard"

const PassList = ({ passes, fetchPasses }) => {


    return (
        passes.map(elm => {
            return (
                <Col md={{ span: 4 }} key={elm._id}>
                    <PassCard
                        img={elm.movieInfo.poster_path}
                        date={elm.passInfo.movieDate}
                        _id={elm.passInfo._id}
                        fetchPasses={fetchPasses}
                        className="passes" />
                </Col>
            )
        })
    )
}

export default PassList