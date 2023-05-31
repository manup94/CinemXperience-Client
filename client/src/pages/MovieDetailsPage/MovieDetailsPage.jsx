import { Children, useEffect, useState } from "react"
import { useParams } from "react-router"
import passServices from '../../services/pass.services'
import moviesServices from '../../services/movies.services'
import { Col, Container, Row, Button, Form } from "react-bootstrap"
import './MovieDetailsPage.css'
const { formatDate } = require('../../utils/formatDate');


const MovieDetailsPage = () => {

    const { movie_id } = useParams()


    const [movie, setMovie] = useState({})

    const [passes, setPasses] = useState([])

    const [movieTitles, setMovieTitles] = useState([]);

    const baseImageUrl = 'https://image.tmdb.org/t/p/original'

    const oneMovieFetch = () => {
        moviesServices
            .getOneMovie(movie_id)
            .then(({ data }) => setMovie(data))
            .catch(err => console.log(err))
    }
    const passFetch = () => {
        passServices
            .getAllPass()
            .then((res) => {
                console.log(movie_id);

                const passes = res.data.filter(elm => {
                    console.log(elm);
                    return elm.movieId == movie_id
                });
                setPasses(passes)

            })
            .catch((err) => console.log(err))
    }


    useEffect(() => {
        oneMovieFetch()
        passFetch()

    }, [])

    console.log(passes);


    return (
        <Container className="d-flex mt-5 full-container">
            <Col className=" img-container" >
                <Row>
                    < img className="img image" src={`${baseImageUrl}${movie.poster_path}`} alt="" />
                </Row>

            </Col>
            <Col className="details-container text-container">
                <Row className="d-flex movie-details">
                    <h1 className="text">{movie.title}</h1>
                    <p className="text">{movie.overview}</p>
                    <p className="text">Fecha de estreno: {movie.release_date}</p>

                </Row>
                <Form className="sesions-form">
                    <Form.Select aria-label="Default select example">
                        <option>Selecciona una sesión disponible</option>
                        {passes.map((elm) => {
                            return <option key={elm.movieId} value={elm.movieDate.value}>
                                {
                                    formatDate(elm.movieDate)
                                }
                            </option>
                        }
                        )}

                    </Form.Select>
                    <Button className="sesions-form-btn" variant="dark" type="submit">
                        Comprar
                    </Button>
                </Form>

            </Col>



        </Container>


    )
}

export default MovieDetailsPage