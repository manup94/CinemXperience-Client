import { useEffect, useState } from "react"
import comboService from "../../services/combos.services"
import { Col, Container, Row } from 'react-bootstrap'
import ComboCard from "../../components/ComboCard/ComboCard"
import ComboList from "../../components/ComboList/ComboList"

const ComboListPage = () => {

    const [combo, setCombo] = useState()

    useEffect(() => {
        comboService
            .getCombos()
            .then(({ data }) => setCombo(data))
            .catch((error) => console.log(error))
    })

    return (
        <Container>
            <h1>Lista de combos</h1>
            <hr />
            <Row>
                {
                    !combo
                        ?
                        <h1>Loading...</h1>
                        :
                        <ComboList combo={combo} />
                }

            </Row>
        </Container>
    )
}

export default ComboListPage