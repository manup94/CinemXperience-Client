import { useEffect, useState } from "react"
import { Row, Spinner } from "react-bootstrap"
import moviesService from "../../services/movies.services"
import './TopMoviePage.css'
import TopMovieList from "../../components/TopMovieList/TopMovieList"


const TopMoviePage = () => {

    const [movieData, setMovieData] = useState()

    const [showGenre, setShowGenre] = useState(undefined)

    const [page, setPage] = useState(1)

    useEffect(() => {
        moviesService
            .getTopRated(1)
            .then((res) => {
                const { results } = res.data
                setMovieData(results)
            })
            .catch((err) => console.log(err));

    }, [])

    useEffect(() => {
        if (!showGenre) {
            moviesService
                .getTopRated(page)
                .then((res) => {
                    const films = res.data.results
                    setMovieData(films)

                })
                .catch((err) => console.log(err));
        }
    }, [page])


    useEffect(() => {
        if (showGenre) {
            setPage(1)
            moviesService
                .GetFilteredMovies(showGenre, 1)
                .then((res) => {
                    const { results } = res.data
                    setMovieData(results)
                })
                .catch((err) => console.log(err))
        }

    }, [showGenre])


    useEffect(() => {

        if (showGenre) {
            moviesService
                .GetFilteredMovies(showGenre, page)
                .then((res) => {
                    const { results } = res.data
                    setMovieData(results)
                })
                .catch((err) => console.log(err))

        }

    }, [page])


    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1)
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1)
        }
    }

    const handleButton = e => {
        setShowGenre(e?.target.value)
    }

    const allMovies = e => {
        setShowGenre(e?.target.value)
        setPage(1)

        moviesService
            .getTopRated(1)
            .then((res) => {
                const { results } = res.data
                setMovieData(results)
            })
            .catch((err) => console.log(err));
    }
    console.log(movieData);

    return (

        !movieData
            ? <div className='loader-container'><Spinner className='loader' animation="border" variant="light" /></div>
            :
            <section>
                <div className='container'>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <button onClick={handleButton} value={28} className="mr-2 btn btn-secondary button" style={{ marginRight: '10px' }}>Accion</button>
                        <button onClick={handleButton} value={27} className="mr-2 btn btn-secondary button" style={{ marginRight: '10px' }}>Terror</button>
                        <button onClick={handleButton} value={16} className="mr-2 btn btn-secondary button" style={{ marginRight: '10px' }}>Infantil</button>
                        <button onClick={handleButton} value={18} className="mr-2 btn btn-secondary button" style={{ marginRight: '10px' }}>Drama</button>
                        <button onClick={allMovies} className="mr-2 btn btn-secondary button">All</button>
                    </div>

                    <Row>
                        <TopMovieList movies={movieData} />
                    </Row>

                    <div className="d-flex justify-content-center mt-5">
                        <button className="mr-2 btn btn-secondary button" onClick={handlePreviousPage}>Pagina anterior</button>
                        <div style={{ width: '50px' }}></div>
                        <button className="btn btn-secondary button" style={{ marginLeft: 'auto' }} onClick={handleNextPage}>Pagina siguiente</button>
                    </div>
                </div>


            </section>


    )
}

export default TopMoviePage