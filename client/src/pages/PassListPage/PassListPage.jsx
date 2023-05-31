import { useEffect, useState } from "react"
import { Container, Row } from 'react-bootstrap'
import passService from "../../services/pass.services"

import PassList from "../../components/PassList/PassList"




const PassListPage = () => {

    const [passes, setPasses] = useState()

    const fetchPasses = () => {
        passService
            .getAllPass()
            .then(({ data }) => setPasses(data))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchPasses()
    }, [])

    return (
        <Container>
            <h1>Pases disponibles: </h1>
            <hr />
            <Row>
                {
                    !passes
                        ?
                        <h1>Loading...</h1>
                        :
                        <PassList fetchPasses={fetchPasses} passes={passes} />
                }

            </Row>
        </Container>
    )
}

export default PassListPage