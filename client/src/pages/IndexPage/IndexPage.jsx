import { Container, Carousel, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useMemo } from 'react';
import moviesService from '../../services/movies.services';
import MoviesList from '../../components/MoviesList/MoviesList';
import { Link, useNavigate } from "react-router-dom"
import './IndexPage.css'



const IndexPage = () => {

    const baseImageUrl = 'https://image.tmdb.org/t/p/original'

    const [movieData, setMovieData] = useState([])

    const moviesFetch = () => {
        moviesService
            .getMovies()
            .then((res) => {
                const titles = res.data.results
                setMovieData(titles)
            })
            .catch((err) => console.log(err));
    }
    const sliderMovies = useMemo(() => {
        const data = [...movieData]
        data.length = 5
        return data

    }, [movieData])

    useEffect(() => {
        moviesFetch()
    }, [])


    return (
        <>
            {

                movieData.length === 0
                    ? <h1>Loading...</h1>
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
                                            <Carousel.Item className='carrousel-img'>
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

                            <>
                                <h1>Peliculas disponibles: </h1>
                                <hr />
                                <Row>
                                    <MoviesList moviesFetch={moviesFetch} movieData={movieData} />
                                </Row>
                            </>

                        </section>
                    </>
            }
        </>



    )
}

export default IndexPage

