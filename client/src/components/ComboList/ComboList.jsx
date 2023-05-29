import { Col } from "react-bootstrap"
import ComboCard from "../ComboCard/ComboCard"
import { useEffect, useState } from "react"
const ComboList = ({ combo, fetchCombos }) => {


    return (
        combo.map(elm => {
            return (
                <Col md={{ span: 4 }} key={elm._id}>
                    <ComboCard className="combo" {...elm} fetchCombos={fetchCombos} />
                </Col>
            )
        })
    )
}

export default ComboList