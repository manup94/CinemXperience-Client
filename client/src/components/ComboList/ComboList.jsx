import { Col } from "react-bootstrap"
import ComboCard from "../ComboCard/ComboCard"

const ComboList = ({ combo }) => {

    return (
        combo.map(elm => {
            return (
                <Col md={{ span: 4 }} key={elm._id}>
                    <ComboCard {...elm} />
                </Col>
            )
        })
    )
}

export default ComboList