import { useContext } from "react"
import { AuthContext } from './../../context/auth.context'
import { Container } from "react-bootstrap"

const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    return (
        <Container>
            <h1>hello there {user.username}</h1>
        </Container>
    )
}

export default ProfilePage