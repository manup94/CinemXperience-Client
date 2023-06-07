import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import './ProfileInfo.css'


const ProfileInfo = ({ profile }) => {

    const { user } = useContext(AuthContext)

    return (

        <Card className="shadow profile-img info-container" >
            <Card.Img variant="top" src={profile.avatar} alt="Image" />
            <Card.Body className="info-container">
                <Card.Title className="text-center">{profile.username}</Card.Title>
                <Card.Text as="div">
                    {profile.email}

                    <div className='justify-content-end'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to={`/profile/${user._id}/edit`} style={{ paddingTop: '15px' }}>
                                <Button variant="dark"> Edit</Button>
                            </Link>
                        </div>
                    </ div>

                </Card.Text>
            </Card.Body>
        </Card>

    )


}

export default ProfileInfo