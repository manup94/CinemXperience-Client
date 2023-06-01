import { Children, useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import passServices from '../../services/pass.services'
import moviesServices from '../../services/movies.services'
import comboService from '../../services/combos.services'
import profileServices from '../../services/profile.services'
import { Col, Container, Row, Button, Form, Modal } from "react-bootstrap"
import './MovieDetailsPage.css'
import ComboList from '../../components/ComboList/ComboList'
import ComboCard from "../../components/ComboCard/ComboCard"
// import * as Select from '@radix-ui/react-select';
import { AuthContext } from "../../context/auth.context"
import { useIsRTL } from "react-bootstrap/esm/ThemeProvider"
const { formatDate } = require('../../utils/formatDate');


const MovieDetailsPage = () => {


    const { user } = useContext(AuthContext)

    const { movie_id } = useParams()

    const baseImageUrl = 'https://image.tmdb.org/t/p/original'

    const [movie, setMovie] = useState({})

    const [passes, setPasses] = useState([])

    const [show, setShow] = useState(false);

    const [combo, setCombos] = useState()

    useEffect(() => {
        oneMovieFetch()
        passFetch()
        fetchCombos()
    }, [])

    const handleClose = () => setShow(false);

    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    }

    const getPack = () => {

        profileServices
            .getPack(user._id)
            .then(res => console.log('compra realizada', res))
            .catch(err => console.log(err))
    }

    const fetchCombos = () => {
        comboService
            .getCombos()
            .then(({ data }) => setCombos(data))
            .catch((error) => console.log(error))
    }

    const oneMovieFetch = () => {
        moviesServices
            .getOneMovie(movie_id)
            .then(({ data }) => setMovie(data))
            .catch(err => console.log(err))
    }

    const passFetch = () => {

        // TODO: CREAR SERVICIO GETPASSESBYMOVIE
        passServices
            .getAllPass()
            .then((res) => {
                const passes = res.data.filter(elm => elm.movieInfo.id == movie_id)
                setPasses(passes)
            })
            .catch((err) => console.log(err))
    }



    return (
        <div className="full-container">
            {
                !combo
                    ? <h1>Loading...</h1>
                    :

                    <Container className="d-flex mt-5 ">
                        <Col className=" img-container" >
                            <Row>
                                < img className="img image" src={`${baseImageUrl}${movie.poster_path}`} alt="" />
                            </Row>

                        </Col>
                        <Col className="details-container text-container">
                            <Row className="d-flex movie-details">
                                <h1 className="text">{movie.title}</h1>
                                <p className="text">{movie.overview}</p>
                                <p className="text">Fecha de estreno: {formatDate(movie.release_date)}</p>

                            </Row>
                            {
                                user && passes.length !== 0
                                    ?
                                    <Button onClick={handleShow} className=" sesions-form-btn" variant="dark" type="submit">
                                        Comprar entradas
                                    </Button>
                                    : <p className="no-sesions-form-btn" variant="danger"> No hay sesiones disponibles</p>

                            }

                        </Col>
                        <>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirma tu pedido</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* TODO: DESACOPLAR FORMULARIO */}
                                    <Form className="sesions-form d-block">
                                        <p>Estas comprando entrada para la pelicula {movie.title}</p>
                                        <Form.Select aria-label="Default select example">
                                            <option>Selecciona una sesión disponible</option>
                                            {passes.map((elm) => {

                                                return <option key={elm.movieId} value={elm.passInfo.movieDate.value}>
                                                    {
                                                        formatDate(elm.passInfo.movieDate)
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


                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={getPack} >
                                        Confirmar
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>



                    </Container >
            }

        </div>


    )
}

export default MovieDetailsPage