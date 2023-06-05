import { Children, useContext, useEffect, useState } from "react"
import { Col, Container, Row, Button, Form, Modal } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import { Link } from 'react-router-dom';
import profileServices from '../../services/profile.services'
import { Value } from "@radix-ui/react-select";
import { loadStripe } from '@stripe/stripe-js';

const { formatDate } = require('../../utils/formatDate');




const ConfirmOrder = ({ handleClose, passes, combo, movie }) => {

    const { user } = useContext(AuthContext)

    const [selectCombo, setSelectCombo] = useState()

    const [selectPass, setSelectPass] = useState()

    const handlePassSelect = (event) => {

        const selectedPass = event.target.value;
        setSelectPass(selectedPass);
    };

    const handleComboSelect = (event) => {

        const selectedCombo = event.target.value;
        setSelectCombo(selectedCombo);
    };


    const getTickets = () => {

        handleClose()

        profileServices
            .getTickets(user._id, { ticket: selectPass, combo: selectCombo })
            .then(res => console.log('compra realizada', res.data))
            .catch(err => console.log(err))
    }


    // useEffect(() => {
    //     // Obtiene la ID de la sesión de pago del servidor
    //     const sessionId = 'ID_DE_LA_SESION_DE_PAGO';

    //     // Redirige al cliente a la página de pago de Stripe
    //     const redirectToCheckout = async () => {
    //         const stripe = await stripePromise;
    //         const result = await stripe.redirectToCheckout({
    //             sessionId,
    //         });

    //         if (result.error) {
    //             // Maneja errores de redirección si es necesario
    //             console.error(result.error);
    //         }
    //     };

    //     redirectToCheckout();
    // }, []);


    return (
        <Modal.Body>
            <Form className="sesions-form d-block">
                <p>Estas comprando entrada para la pelicula {movie.title}</p>
                <Form.Select
                    onChange={handlePassSelect}
                    aria-label="Default select example" >
                    <option>Selecciona una sesión disponible</option>
                    {passes.map((elm) => {

                        return (
                            <option key={elm._id} value={elm._id}>

                                {
                                    formatDate(elm.movieDate)
                                }
                            </option>

                        )
                    }
                    )}

                </Form.Select>
                <Form.Select
                    onChange={handleComboSelect}
                    aria-label="Default select example">
                    <option>Selecciona un Combo</option>
                    {combo.map((elm) => {
                        return (
                            <option key={elm._id} value={elm._id} >
                                {elm.name}
                            </option>
                        );
                    })}
                </Form.Select>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark"
                        onClick={getTickets}
                    >

                        <Link to={'https://buy.stripe.com/test_aEU29odBveMdbFm144'}>  Confirmar</Link>
                    </Button>

                </Modal.Footer>

            </Form>


        </Modal.Body >
    )
}


export default ConfirmOrder