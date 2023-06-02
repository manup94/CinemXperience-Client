import { Col, Container, Row, Button, Form, Modal } from "react-bootstrap"
const { formatDate } = require('../../utils/formatDate');

const ConfirmOrder = ({ handleClose, passes, combo, movie }) => {

    return (
        <Modal.Body>
            <Form className="sesions-form d-block">
                <p>Estas comprando entrada para la pelicula {movie.title}</p>
                <Form.Select aria-label="Default select example">
                    <option>Selecciona una sesión disponible</option>
                    {passes.map((elm) => {

                        return <option key={elm.movieId} value={elm.movieDate}>
                            {
                                formatDate(elm.movieDate)
                            }
                        </option>
                    }
                    )}

                </Form.Select>
                <Form.Select aria-label="Default select example">
                    <option>Selecciona un Combo</option>
                    {combo.map((elm) => {
                        return (
                            <option key={elm._id} value={elm._id} >
                                {elm.name}
                            </option>
                        );
                    })}
                </Form.Select>


            </Form>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary"
                // onClick={getPack} 
                >
                    Confirmar
                </Button>
            </Modal.Footer>


        </Modal.Body>
    )
}

export default ConfirmOrder