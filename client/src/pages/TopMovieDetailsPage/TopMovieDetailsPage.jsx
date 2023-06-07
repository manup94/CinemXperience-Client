import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import profileService from "../../services/profile.services"
import { useParams } from "react-router"
import moviesServices from '../../services/movies.services'
import { Button, Col, Container, Row } from "react-bootstrap"
import './TopMovieDetailsPage.css'
import { MessageContext } from "../../context/message.context"
import { Link } from "react-router-dom"
import FormError from "../../components/FormError/FormError"
import { BASE_IMAGE_URL } from "../../consts/movie-consts"
const { formatDate } = require('../../utils/formatDate');


const MovieDetailsPage = () => {

    const { user } = useContext(AuthContext)

    const { movie_id } = useParams()

    const [movie, setMovie] = useState({})

    const { emitMessage } = useContext(MessageContext)

    const [errors, setErrors] = useState([])

    useEffect(() => {
        oneMovieFetch()
    }, [])

    const oneMovieFetch = () => {
        moviesServices
            .getOneMovie(movie_id)
            .then(({ data }) => setMovie(data))
            .catch(err => console.log(err))
    }

    const addToWatchlist = () => {
        profileService
            .AddWatchlistId(user._id, movie_id)
            .then(({ data }) => {
                const message = data ? 'Añadido a Watchlist' : 'Ya existe en tu Watchlist'
                emitMessage(message)
            })
            .catch(err => console.log(err))

    }



    return (
        <div className="full-container">
            <Container className="d-flex mt-5 ">
                <Col className=" img-container" >
                    <Row>
                        < img className="img image" src={`${BASE_IMAGE_URL}${movie.poster_path}`} alt="movie-poster" />
                    </Row>

                </Col>
                <Col className="details-container text-container">
                    <Row className="d-flex movie-details">
                        <h1 className="text">{movie.title}</h1>
                        <p className="text">{movie.overview}</p>
                        <p className="text">Fecha de estreno: {formatDate(movie.release_date)}</p>
                        <p className="text">Puntuación media: {movie.vote_average}</p>
                        <div>
                            {user
                                ?
                                (<Button onClick={addToWatchlist} className="mt-5 btn btn-secondary" style={{ width: '150px' }}>Add to Watchlist</Button>)
                                :
                                (<Link to={'/login'} className="sesions-form-btn"><Button>Por favor, inicia sesión para añadir a la Watchlist</Button></Link>)}

                            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
                        </div>

                    </Row>
                </Col>

            </Container >
        </div>
    )
}

export default MovieDetailsPage

