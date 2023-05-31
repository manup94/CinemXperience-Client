import { Col } from "react-bootstrap"
import PassCard from "../PassCard/PassCard"

const PassList = ({ passes, fetchPasses }) => {


    return (
        passes.map(elm => {
            return (
                <Col md={{ span: 4 }} key={elm._id}>
                    <PassCard className="passes" {...elm} fetchPasses={fetchPasses} />
                </Col>
            )
        })
    )
}

export default PassList