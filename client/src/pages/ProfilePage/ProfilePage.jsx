import { useContext, useEffect, useState } from "react"
import { AuthContext } from './../../context/auth.context'
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import './ProfilePage.css'
import profileService from "../../services/profile.services"
import { Link } from "react-router-dom"

const ProfilePage = () => {

    const { user } = useContext(AuthContext)


    const [profile, setProfile] = useState()


    useEffect(() => {
        userInfo()
    }, [])

    const userInfo = () => {
        profileService
            .getOneProfile(user._id)
            .then(({ data }) => setProfile(data))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            {
                !profile
                    ?
                    <h1>Hello there</h1>
                    :
                    <>
                        <Container fluid>
                            <Row className="justify-content-center mt-4">
                                <Col xs={10} sm={8} md={6} lg={4}>
                                    <Card className="shadow">
                                        <Card.Img variant="top" src={profile.avatar} alt="Image" />
                                        <Card.Body>
                                            <Card.Title className="text-center">{profile.username}</Card.Title>
                                            <Card.Text>
                                                {profile.email}
                                                <div className='justify-content-end'>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Link to={`/profile/${user._id}/edit`} style={{ paddingTop: '15px' }}>
                                                            <Button> Edit</Button>
                                                        </Link>
                                                    </div>
                                                </ div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </>
            }
        </Container>

    )
}

export default ProfilePage