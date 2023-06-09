import { Col } from "react-bootstrap"
import ComboCard from "../ComboCard/ComboCard"
import './ComboList.css'
const ComboList = ({ combos, fetchCombos }) => {


    return (
        combos.map(elm => {
            return (
                <Col md={{ span: 4 }} key={elm._id}>
                    <ComboCard className="combo" {...elm} fetchCombos={fetchCombos} />
                </Col>
            )
        })
    )
}

export default ComboList