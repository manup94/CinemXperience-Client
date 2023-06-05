import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/LoginForm/LoginForm'
import { color } from '@cloudinary/url-gen/qualifiers/background'


const LoginPage = () => {

    return (

        <Container>

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1 style={{ color: 'white' }}>Iniciar sesión</h1>

                    <hr />

                    <LoginForm />

                </Col>
            </Row>

        </Container >
    )
}

export default LoginPage