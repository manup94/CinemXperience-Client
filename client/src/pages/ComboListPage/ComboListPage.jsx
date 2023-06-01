import { useEffect, useState } from "react"
import comboService from "../../services/combos.services"
import { Container, Spinner, Row } from 'react-bootstrap'
import ComboList from "../../components/ComboList/ComboList"
import './ComboListPage'

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
        <div className='loader-container'>
            {!combo ? (
                <div >
                    <Spinner className='loader' animation="border" variant="light" />
                </div>
            )
                :
                (
                    <Container className="combo-container">
                        <Row >
                            {
                                !combo ? (
                                    <h1>Loading...</h1>
                                ) : (
                                    <ComboList fetchCombos={fetchCombos} combo={combo} />
                                )
                            }
                        </Row>
                    </Container>
                )}
        </div>
    )
}

export default ComboListPage