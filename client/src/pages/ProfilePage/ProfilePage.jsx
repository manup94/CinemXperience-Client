import { useContext, useEffect, useState } from "react"
import { AuthContext } from './../../context/auth.context'
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import './ProfilePage.css'
import profileService from "../../services/profile.services"
import { Link } from "react-router-dom"

const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [profile, setProfile] = useState()

    const [pack, setPack] = useState([])



    useEffect(() => {
        getUserInfo()

    }, [])

    // const GetPackDetails = () => {

    //     const pack_id = profile.packs[0]._id;

    //     profileService
    //         .getPackDetails(pack_id)
    //         .then((res) => setProfile(res))
    //         .catch((err) => console.log(err));

    // };


    const getUserInfo = () => {
        profileService
            .getOneProfile(user._id)
            .then(({ data }) => {
                setProfile(data);
                // GetPackDetails()
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container>
            {
                !profile
                    ?
                    <h1>Hello there</h1>
                    :
                    <>
                        <Container fluid>
                            <Row className="justify-content-center mt-4 mb-4">
                                <Col xs={10} sm={8} md={6} lg={4}>
                                    <Card className="shadow">
                                        <Card.Img variant="top" src={profile.avatar} alt="Image" />
                                        <Card.Body>
                                            <Card.Title className="text-center">{profile.username}</Card.Title>
                                            <Card.Text as="div">
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