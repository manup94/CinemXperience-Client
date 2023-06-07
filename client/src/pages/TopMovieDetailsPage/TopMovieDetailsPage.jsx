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
import moviesService from "../../services/movies.services"
const { formatDate } = require('../../utils/formatDate');

const MovieDetailsPage = () => {

    const { user } = useContext(AuthContext)

    const [profile, setProfile] = useState()

    const { movie_id } = useParams()

    const baseImageUrl = 'https://image.tmdb.org/t/p/original'

    const [movie, setMovie] = useState({})

    const [watchlistMovies, setWatchlistMovies] = useState([])

    const { emitMessage } = useContext(MessageContext)

    const [errors, setErrors] = useState([])


    useEffect(() => {
        oneMovieFetch()
        getUserInfo()
    }, [])

    const oneMovieFetch = () => {
        moviesServices
            .getOneMovie(movie_id)
            .then(({ data }) => setMovie(data))
            .catch(err => console.log(err))
    }

    const addToWatchlist = () => {
        if (user && user._id) {
            profileService
                .AddWatchlistId(user._id, movie_id)
                .then(({ data }) => {
                    getUserInfo()
                    if (data) {
                        emitMessage('Añadido a Watchlist')
                    } else {
                        emitMessage('Ya existe en tu Watchlist')
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const getUserInfo = () => {
        if (user && user._id) {
            profileService
                .getOneProfile(user._id)
                .then(({ data }) => {
                    setProfile(data);
                    getWatchlist(data.watchList)
                })
                .catch((err) => console.log(err));
        }
    }

    const getWatchlist = (watchList) => {
        const promises = watchList.map((movieId) =>
            moviesService
                .getOneMovie(movieId)
        );

        Promise.all(promises)
            .then((responses) => {
                const moviesData = responses.map(({ data }) => data);
                setWatchlistMovies(moviesData);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="full-container">
            <Container className="d-flex mt-5 ">
                <Col className=" img-container" >
                    <Row>
                        < img className="img image" src={`${baseImageUrl}${movie.poster_path}`} alt="movie-poster" />
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
                                (watchlistMovies.some(elm => elm.id == movie_id) ? (
                                    <p className="mt-5">Ya está en tu Watchlist</p>
                                ) : (
                                    <Button onClick={addToWatchlist} className="mt-5 btn btn-secondary" style={{ width: '150px' }}>Add to Watchlist</Button>)
                                )
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

