import Container from "react-bootstrap/esm/Container"
import NewComboForm from "../../components/NewComboForm/NewComboForm"


const NewComboPage = () => {

    return (
        <Container>
            <h1 style={{ color: 'white' }}>Nuevo Combo</h1>
            <hr />
            <NewComboForm />
        </Container>
    )
}

export default NewComboPage