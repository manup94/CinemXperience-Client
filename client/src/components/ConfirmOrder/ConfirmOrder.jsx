import { useContext, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import profileServices from '../../services/profile.services'
import stripeServices from '../../services/stripe.services'


import FormError from "../FormError/FormError";
import { MessageContext } from "../../context/message.context";
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = () => loadStripe('pk_test_51NEyyIIYMW6vfRer27ZHBgAsaItkKJ8HdwhQTgnwMEQxXBx5Nys8DKIknApk4I8qZFqBR8uLirhFuJ6xQq1rovvG00PnX7RUUO');


const { formatDate } = require('../../utils/formatDate');


const ConfirmOrder = ({ handleClose, passes, combo, movie }) => {

    const { user } = useContext(AuthContext);

    const [selectCombo, setSelectCombo] = useState();

    const [selectPass, setSelectPass] = useState();

    const { emitMessage } = useContext(MessageContext);

    const [errors, setErrors] = useState([]);

    const [loading, setLoading] = useState(false);


    const handlePassSelect = (event) => {
        const selectedPass = event.target.value;
        setSelectPass(selectedPass);
    };

    const handleComboSelect = (event) => {
        const selectedCombo = event.target.value;
        setSelectCombo(selectedCombo);
    };

    const getTickets = () => {
        setLoading(true)

        profileServices
            .getTickets(user._id, { ticket: selectPass, combo: selectCombo })
            .then(({ data }) => {
                emitMessage('Compra realizada');
                setLoading(false)
                handleClose();
            })
            .catch((err) => {
                setErrors(err.response.data.errorMessages);
                setLoading(false)
            });
    };

    const handlePayment = async () => {
        const stripe = await stripePromise()

        const checkoutSession = await stripeServices.createCheckoutSesion()
        const { sessionId } = checkoutSession.data
        const { error } = await stripe.redirectToCheckout({
            sessionId, // Reemplaza con el ID de sesión de pago generado en el backend
        });

        if (error) {
            console.log('Error al redirigir a la página de pago:', error);
        }
    };




    return (
        <Modal.Body>
            <Form className="sesions-form d-block">
                <p>Estas comprando entrada para la pelicula {movie.title}</p>
                <Form.Select onChange={handlePassSelect} aria-label="Default select example">
                    <option>Selecciona una sesión disponible</option>
                    {passes.map((elm) => {
                        return (
                            <option key={elm._id} value={elm._id}>
                                {formatDate(elm.movieDate)}
                            </option>
                        );
                    })}
                </Form.Select>
                <Form.Select onChange={handleComboSelect} aria-label="Default select example">
                    <option>Selecciona un Combo</option>
                    {combo.map((elm) => {
                        return (
                            <option key={elm._id} value={elm._id}>
                                {elm.name}
                            </option>
                        );
                    })}
                </Form.Select>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <div variant="dark" onClick={getTickets}>
                        {loading ? (
                            'Loading...'
                        ) : (
                            <>
                                <Button onClick={handlePayment} style={{ textDecoration: 'none', color: 'white' }}>Confirmar</Button>
                            </>
                        )}
                    </div>
                    {errors.length > 0 && <FormError>{errors.map((elm) => <p>{elm}</p>)}</FormError>}
                </Modal.Footer>
            </Form>
        </Modal.Body>
    );
};

export default ConfirmOrder;
