import { Container, Row, Col } from 'react-bootstrap'
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm.jsx'

const ProfileEditPage = () => {

    return (

        <Container style={{ paddingTop: '50px' }}>

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Editar Perfil</h1>

                    <hr />

                    <EditProfileForm />

                </Col>
            </Row>

        </Container>
    )
}

export default ProfileEditPage