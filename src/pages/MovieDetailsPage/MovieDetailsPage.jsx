import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import passServices from '../../services/pass.services'
import moviesServices from '../../services/movies.services'
import comboService from '../../services/combos.services'
import { Col, Container, Row, Button, Spinner, Modal } from "react-bootstrap"
import './MovieDetailsPage.css'
import { AuthContext } from "../../context/auth.context"
import ConfirmOrder from "../../components/ConfirmOrder/ConfirmOrder"
import { Link } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import { BASE_IMAGE_URL } from "../../consts/movie-consts"

const { formatDate } = require('../../utils/formatDate');


const MovieDetailsPage = () => {

    const { user } = useContext(AuthContext)

    const { movie_id } = useParams()

    const [movie, setMovie] = useState({})

    const [passes, setPasses] = useState([])

    const [show, setShow] = useState(false);

    const [combo, setCombos] = useState()

    useEffect(() => {
        oneMovieFetch()
        passFetch()
        fetchCombos()
    }, [])

    const handleClose = () => { setShow(false) }

    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
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
        passServices
            .getPassByMovie(movie_id)
            .then(res => setPasses(res.data))
            .catch((err) => console.log(err))
    }

    return (

        !movie.poster_path
            ? <Loader />
            :


            <Container className="d-flex mt-5 ">
                <Row>

                    <Col className=" img-container" >

                        < img className="img image" src={`${BASE_IMAGE_URL}${movie.poster_path}`} alt="movie-poster" />

                    </Col>
                    <Col className="details-container  text-container">
                        <Row className="d-flex movie-details align-content-center">
                            <h1 className="text">{movie.title}</h1>
                            <p className="text">{movie.overview}</p>
                            <p className="text">Fecha de estreno: {formatDate(movie.release_date)}</p>


                            {

                                <div>
                                    {user && passes.length !== 0 ? (
                                        <Button onClick={handleShow} className="sesions-form-btn" variant="dark" >
                                            Comprar entradas
                                        </Button>
                                    ) : passes.length === 0 ? (
                                        <p className="no-sesions-form-btn" variant="danger">No hay sesiones disponibles</p>
                                    ) : (
                                        <Link to={'/login'} className="sesions-form-btn"><Button>Por favor, inicia sesión para comprar entradas</Button></Link>
                                    )}
                                </div>

                            }
                        </Row>

                    </Col>
                    <>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirma tu pedido</Modal.Title>
                            </Modal.Header>
                            <ConfirmOrder
                                handleClose={handleClose}
                                passes={passes}
                                combo={combo}
                                movie={movie}
                            />

                        </Modal>
                    </>

                </Row>



            </Container >





    )
}

export default MovieDetailsPage