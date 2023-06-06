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
                const films = res.data.results
                setMovieData(films)

            })
            .catch((err) => console.log(err));

    }, [])


    useEffect(() => {
        if (showGenre) {
            setPage(1)
            moviesService
                .GetFilteredMovies(showGenre, 1)
                .then((res) => {
                    const films = res.data.results
                    setMovieData(films)
                })
                .catch((err) => console.log(err))
        }

    }, [showGenre])


    useEffect(() => {

        if (showGenre) {
            moviesService
                .GetFilteredMovies(showGenre, page)
                .then((res) => {
                    const films = res.data.results
                    setMovieData(films)
                })
                .catch((err) => console.log(err))

        }

    }, [page])

    console.log("-------", page, showGenre)


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
                const films = res.data.results
                setMovieData(films)
            })
            .catch((err) => console.log(err));
    }


    return (

        !movieData
            ? <div className='loader-container'><Spinner className='loader' animation="border" variant="light" /></div>
            :
            <section>
                <div className='container'>
                    <button onClick={handleButton} value={28} className="mr-2 btn btn-secondary button " >Accion</button>
                    <button onClick={handleButton} value={27} className="mr-2 btn btn-secondary button " >Terror</button>
                    <button onClick={handleButton} value={16} className="mr-2 btn btn-secondary button " >Infantil</button>
                    <button onClick={handleButton} value={18} className="mr-2 btn btn-secondary button " >Drama</button>
                    <button onClick={allMovies} className="mr-2 btn btn-secondary button " >All</button>

                    <Row>
                        <TopMovieList movieData={movieData} />
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