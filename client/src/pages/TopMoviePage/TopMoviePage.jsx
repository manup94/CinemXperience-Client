import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import moviesService from "../../services/movies.services"
import TopMovieList from "../../components/TopMovieList/TopMovieList"


const TopMoviePage = () => {
    const baseImageUrl = 'https://image.tmdb.org/t/p/original'

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
        <section>
            <div className='container'>
                <Row>
                    <TopMovieList moviesFetch={moviesFetch} movieData={movieData} />
                </Row>
                <div className="d-flex justify-content-center mt-5">
                    <button className="mr-2 btn btn-secondary flex-fill" onClick={handlePreviousPage}>Previous Page</button>
                    <div style={{ width: '50px' }}></div>
                    <button className="btn btn-secondary flex-fill" style={{ marginLeft: 'auto' }} onClick={handleNextPage}>Next Page</button>
                </div>
            </div>
        </section>
    )
}

export default TopMoviePage