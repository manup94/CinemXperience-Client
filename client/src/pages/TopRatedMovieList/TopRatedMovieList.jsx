import { useEffect, useState } from "react";
import moviesService from "../../services/movies.services";
import { Row } from "react-bootstrap";
import TopRatedMovieDetails from "../TopMovieDetailsPage/TopMovieDetailsPage";
import MoviesList from "../../components/MoviesList/MoviesList";

const TopRatedMovieList = () => {

    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        moviesFetch()
    }, []);


    const moviesFetch = () => {
        moviesService
            .getTopRated()
            .then((res) => {
                const titles = res.data.results
                setMovieData(titles)
            })
            .catch((err) => console.log(err));
    }

    return (
        <section>

            <div className='container'>

                <Row>
                    <MoviesList moviesFetch={moviesFetch} movieData={movieData} />
                </Row>
            </div>

        </section>
    )
}

export default TopRatedMovieList