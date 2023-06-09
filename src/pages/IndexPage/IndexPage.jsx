import { Carousel, Spinner, Row, Col, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import moviesService from '../../services/movies.services';
import MoviesList from '../../components/MoviesList/MoviesList';
import { Link } from "react-router-dom"
import './IndexPage.css'
import SearchBar from '../../components/SearchBar/SearchBar';


const IndexPage = () => {
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'

    const [movieData, setMovieData] = useState([])
    const [movieDataBackup, setMovieDataBackup] = useState([])
    const [sliderMovies, setSliderMovies] = useState([]);

    const moviesFetch = () => {
        return moviesService
            .getMovies()
            .then((res) => {
                const titles = res.data.results
                setMovieData(titles)
                setMovieDataBackup(titles)
                return titles;
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        moviesFetch()
            .then(titles => {
                const data = [...titles];
                data.length = 5;
                setSliderMovies(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const filterData = query => {
        const filterDataMovie = movieDataBackup.filter(elm => elm.title.toLowerCase().includes(query.toLowerCase()))
        setMovieData(filterDataMovie)
    }


    return (
        <Container className='index-container'>
            <Row className='search-bar d-flex'>
                <Col >

                    <SearchBar filterData={filterData} />
                </Col>

            </Row>
            {

                movieData.length === 0
                    ? <div className='loader-container'><Spinner className='loader' animation="border" variant="light" /></div>
                    :
                    <>

                        <Row className='carrousel-container'>
                            <Col className='text-container '>
                                <h1>CinemXperience</h1>
                                <p className='slogan'>Vive el lujo del cine de primera clase con CinemXperience, donde la comodidad,
                                    la tecnología de vanguardia y las mejores películas se unen en un solo lugar.</p>
                            </Col>
                            <Carousel as={Col} className='carrousel-all'>
                                {
                                    sliderMovies.map(elm => {
                                        return (
                                            <Carousel.Item key={elm.id} className='carrousel-img'>
                                                <Link to={`/movies/${elm.id}`} >
                                                    <img
                                                        className="d-block w-100  "
                                                        src={`${baseImageUrl}${elm.poster_path}`}
                                                        alt="First slide"
                                                    />

                                                </Link>

                                            </Carousel.Item>
                                        )

                                    })
                                }

                            </Carousel>

                        </Row >
                        <section>

                            <Container >

                                <Row className='justify-content-center'>
                                    <MoviesList moviesFetch={moviesFetch} movieData={movieData} />
                                </Row>
                            </Container>

                        </section>
                    </>
            }
        </Container>



    )
}

export default IndexPage






