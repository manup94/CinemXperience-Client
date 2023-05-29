import { useEffect, useState } from "react"
import comboService from "../../services/combos.services"
import { Col, Container, Row } from 'react-bootstrap'
import ComboList from "../../components/ComboList/ComboList"

const ComboListPage = () => {

    const [combo, setCombos] = useState()

    const fetchCombos = () => {
        comboService
            .getCombos()
            .then(({ data }) => setCombos(data))
            .catch((error) => console.log(error))
<<<<<<< HEAD
    }

    useEffect(() => {
        fetchCombos()
=======
>>>>>>> b4a5f9dded50a8a442ef2a5f759634472a08ba77
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