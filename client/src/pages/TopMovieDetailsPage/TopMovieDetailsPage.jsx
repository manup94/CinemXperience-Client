import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import profileService from "../../services/profile.services"
import { useParams } from "react-router"
import moviesServices from '../../services/movies.services'
import { Button, Col, Container, Row } from "react-bootstrap"
import './TopMovieDetailsPage.css'
import { MessageContext } from "../../context/message.context"
const { formatDate } = require('../../utils/formatDate');

const MovieDetailsPage = () => {

    const { user } = useContext(AuthContext)

    const { movie_id } = useParams()

    const baseImageUrl = 'https://image.tmdb.org/t/p/original'

    const [movie, setMovie] = useState({})

    const { emitMessage } = useContext(MessageContext)

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
            .then(() => {
                emitMessage('Añadido a Watchlist')
            })

            .catch(err => console.log(err))
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
                        <Button onClick={addToWatchlist} className="mt-5 btn btn-secondary" style={{ width: '150px' }}>Add to Watchlist</Button>

                    </Row>
                </Col>

            </Container >
        </div>
    )
}

export default MovieDetailsPage