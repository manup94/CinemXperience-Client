import { Children, useEffect, useState } from "react"
import { useParams } from "react-router"
import moviesServices from '../../services/movies.services'
import { Col, Container, Row } from "react-bootstrap"
const { formatDate } = require('../../utils/formatDate');


const TopMovieDetailsPage = () => {


    const { movie_id } = useParams()

    const baseImageUrl = 'https://image.tmdb.org/t/p/original'

    const [movie, setMovie] = useState({})



    useEffect(() => {
        oneMovieFetch()
    }, [])

    const oneMovieFetch = () => {
        moviesServices
            .getOneMovie(movie_id)
            .then(({ data }) => setMovie(data))
            .catch(err => console.log(err))
    }

    return (
        <div className="full-container">
            {

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

                        </Row>
                    </Col>
                </Container >
            }
        </div>
    )
}

export default TopMovieDetailsPage