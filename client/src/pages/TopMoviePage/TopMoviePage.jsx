import { useEffect, useState } from "react"
import { Row, Spinner } from "react-bootstrap"
import moviesService from "../../services/movies.services"
import './TopMoviePage.css'
import TopMovieList from "../../components/TopMovieList/TopMovieList"


const TopMoviePage = () => {


    const [movieData, setMovieData] = useState([])

    const [page, setPage] = useState(1)

    useEffect(() => {
        moviesFetch()
    }, [page])

    const moviesFetch = () => {
        moviesService
            .getTopRated(page)
            .then((res) => {
                const titles = res.data.results
                setMovieData(titles)
                return titles;
            })
            .catch((err) => console.log(err));
    }

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1)

    }

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1)
        }
    }

    const handleButton = e => {

        moviesService
            .GetFilteredMovies(e.target.value, page)
            .then((res) => {
                const titles = res.data.results
                setMovieData(titles)
                return titles;
            })
            .catch((err) => console.log(err));
    }

    return (

        movieData.length === 0
            ? <div className='loader-container'><Spinner className='loader' animation="border" variant="light" /></div>
            :
            <section>
                <div className='container'>
                    <button onClick={handleButton} value={28} className="mr-2 btn btn-secondary button " >Accion</button>
                    <button onClick={handleButton} value={27} className="mr-2 btn btn-secondary button " >Terror</button>
                    <button onClick={handleButton} value={16} className="mr-2 btn btn-secondary button " >Infantil</button>
                    <button onClick={handleButton} value={18} className="mr-2 btn btn-secondary button " >Drama</button>
                    <button onClick={moviesFetch} className="mr-2 btn btn-secondary button " >All</button>

                    <Row>
                        <TopMovieList moviesFetch={moviesFetch} movieData={movieData} />
                    </Row>
                    <div className="d-flex justify-content-center mt-5">
                        <button className="mr-2 btn btn-secondary button " onClick={handlePreviousPage}>Pagina anterior</button>
                        <div style={{ width: '50px' }}></div>
                        <button className="btn btn-secondary button " style={{ marginLeft: 'auto' }} onClick={handleNextPage}>Pagina siguiente</button>
                    </div>
                </div>
            </section>


    )
}

export default TopMoviePage