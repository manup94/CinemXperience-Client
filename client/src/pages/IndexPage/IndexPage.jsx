import { Container, Carousel, Spinner, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import moviesService from '../../services/movies.services';
import MoviesList from '../../components/MoviesList/MoviesList';
import { Link, useNavigate } from "react-router-dom"
import './IndexPage.css'


const IndexPage = () => {
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'

    const [movieData, setMovieData] = useState([])
    const [sliderMovies, setSliderMovies] = useState([]);

    const moviesFetch = () => {
        return moviesService
            .getMovies()
            .then((res) => {
                const titles = res.data.results
                setMovieData(titles)
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



    return (
        <>
            {

                movieData.length === 0
                    ? <div className='loader-container'><Spinner className='loader' animation="border" variant="light" /></div>
                    :
                    <>

                        <header className='carrousel-container'>
                            <div className='text-container'>
                                <h1>CinemXperience</h1>
                                <p className='slogan'>Vive el lujo del cine de primera clase con CinemXperience, donde la comodidad,
                                    la tecnología de vanguardia y las mejores películas se unen en un solo lugar.</p>
                            </div>
                            <Carousel className='carrousel-all'>
                                {
                                    sliderMovies.map(elm => {
                                        return (
                                            <Carousel.Item key={elm._id} className='carrousel-img'>
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

                        </header >
                        <section>

                            <div className='container'>

                                <Row>
                                    <MoviesList moviesFetch={moviesFetch} movieData={movieData} />
                                </Row>
                            </div>

                        </section>
                    </>
            }
        </>



    )
}

export default IndexPage

