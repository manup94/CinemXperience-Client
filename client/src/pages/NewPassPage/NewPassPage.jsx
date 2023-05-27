import Container from "react-bootstrap/esm/Container"
import NewPassForm from "../../components/NewPassForm/NewPassForm"

const NewPassPage = () => {

    return (
        <Container>
            <h1>Nueva Sesión</h1>
            <hr />
            <NewPassForm />
        </Container>
    )
}

export default NewPassPage