import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import profileService from "../../services/profile.services"
import { useParams } from "react-router"
import moviesServices from '../../services/movies.services'
import { Button, Col, Container, Row } from "react-bootstrap"
import './TopMovieDetailsPage.css'
import { MessageContext } from "../../context/message.context"
import { Link } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import FormError from "../../components/FormError/FormError"
import { BASE_IMAGE_URL } from "../../consts/movie-consts"
import Comments from "../../components/Comments/Comments"
const { formatDate } = require('../../utils/formatDate');


const MovieDetailsPage = () => {

    const { user } = useContext(AuthContext)

    const [profile, setProfile] = useState()

    const { movie_id } = useParams()

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
        profileService
            .AddWatchlistId(user._id, movie_id)
            .then(({ data }) => {
                getUserInfo()
                const message = data ? 'Añadido a Watchlist' : 'Ya existe en tu Watchlist'
                emitMessage(message)
            })
            .catch(err => console.log(err))

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
            moviesServices
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
        !movie.poster_path
            ? <Loader />
            :
            <div className="full-container">
                <Container className="d-flex  ">
                    <Row>
                        <Col className="m-5 " >

                            < img style={{ width: '100%' }} src={`${BASE_IMAGE_URL}${movie.poster_path}`} alt="movie-poster" />


                        </Col>
                        <Col className="details-container m-5 flex-column text-container" >

                            <h1 style={{ marginBottom: '50px' }}>{movie.title}</h1>
                            <p className="">{movie.overview}</p>
                            <p className="">Fecha de estreno: {formatDate(movie.release_date)}</p>
                            <p className="">Puntuación media: {movie.vote_average}</p>
                            <div style={{ marginTop: '50px' }}>
                                {user
                                    ?
                                    (watchlistMovies.some(elm => elm.id == movie_id) ? (
                                        <p >Ya está en tu Watchlist</p>
                                    ) : (
                                        <Button onClick={addToWatchlist} className=" btn btn-secondary" style={{ width: '150px' }}>Add to Watchlist</Button>)
                                    )
                                    :
                                    (<Link to={'/login'} className="sesions-form-btn"><Button>Por favor, inicia sesión para añadir a la Watchlist</Button></Link>)}

                                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
                            </div>


                        </Col>
                        <Comments movie_id={movie_id}></Comments>

                    </Row>

                </Container >
            </div>
    )
}

export default MovieDetailsPage

