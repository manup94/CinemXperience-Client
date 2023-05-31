import { useEffect, useState } from "react"
import { useParams } from "react-router"
import comboService from "../../services/combos.services"
import { Col, Container, Row } from "react-bootstrap"
import './ComboDetailsPage.css'

const ComboDetailsPage = () => {

    const { combo_id } = useParams()

    const [combo, setCombo] = useState({})

    useEffect(() => {
        comboService
            .getOneCombo(combo_id)
            .then(({ data }) => setCombo(data))
            .catch(err => console.log(err))
    }, [])


    return (
        <Container className="d-flex">
            <Col >
                <Row>
                    < img className="img" src={combo.image} alt="" />
                </Row>

            </Col>
            <Col className="details-container">
                <Row>
                    <h1>party{combo.name}</h1>
                    <ul>
                        <li>{combo.snacks}</li>
                        <li>{combo.drinks}</li>
                        <li>{combo.price} €</li>
                    </ul>

                </Row>

            </Col>


        </Container>


    )
}

export default ComboDetailsPage