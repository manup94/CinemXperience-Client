import { useEffect, useState } from "react"
import comboService from "../../services/combos.services"
import { Container, Row } from 'react-bootstrap'
import ComboList from "../../components/ComboList/ComboList"

const ComboListPage = () => {

    const [combo, setCombos] = useState()

    const fetchCombos = () => {
        comboService
            .getCombos()
            .then(({ data }) => setCombos(data))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchCombos()
    }, [])

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
                        <ComboList fetchCombos={fetchCombos} combo={combo} />
                }

            </Row>
        </Container>
    )
}

export default ComboListPage