import { useEffect, useState } from "react"
import { Container, Spinner, Row } from 'react-bootstrap'
import passService from "../../services/pass.services"

import PassList from "../../components/PassList/PassList"




const PassListPage = () => {

    const [passes, setPasses] = useState()

    useEffect(() => {
        fetchPasses()
    }, [])

    const fetchPasses = () => {
        passService
            .getAllPass()
            .then(({ data }) => setPasses(data))
            .catch((error) => console.log(error))
    }


    return (
        <Container>
            {
                !passes
                    ? <div className='loader-container'><Spinner className='loader' animation="border" variant="light" /></div>
                    :
                    <Row>
                        {
                            !passes
                                ?
                                <h1>Loading...</h1>
                                :
                                <PassList fetchPasses={fetchPasses} passes={passes} />
                        }

                    </Row>

            }
        </Container>
    )
}

export default PassListPage