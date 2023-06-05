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
        console.log(page)
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1)
        }
    }

    return (

        movieData.length === 0
            ? <div className='loader-container'><Spinner className='loader' animation="border" variant="light" /></div>
            :
            <section>
                <div className='container'>
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