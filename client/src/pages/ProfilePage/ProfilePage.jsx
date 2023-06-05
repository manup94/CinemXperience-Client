import { useContext, useEffect, useState } from "react"
import { AuthContext } from './../../context/auth.context'
import { Col, Container, Row } from "react-bootstrap"
import './ProfilePage.css'
import profileService from "../../services/profile.services"
import moviesService from "../../services/movies.services"
import Loader from "../../components/Loader/Loader"
import Packs from "../../components/Packs/Packs"
import WatchList from "../../components/WatchList/WatchList"
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo"


const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [profile, setProfile] = useState()

    const [movie, setMovie] = useState([])

    const [pack, setPack] = useState([])

    const [movies, setMovies] = useState({})


    useEffect(() => {
        getUserInfo()
    }, [])


    const getUserInfo = () => {
        profileService
            .getOneProfile(user._id)
            .then(({ data }) => {
                setProfile(data);
                getWatchlist(data.watchList)
                GetMovies(data.packs.map((pack) => {
                    console.log(pack.ticket);
                    return pack.ticket
                }))

            })
            .catch((err) => console.log(err));
    }

    const getWatchlist = (watchList) => {
        const promises = watchList.map((movieId) =>
            moviesService
                .getOneMovie(movieId)
        );

        Promise.all(promises)
            .then((responses) => {
                const moviesData = responses.map(({ data }) => data);
                setMovie(moviesData);
            })
            .catch((err) => console.log(err));
    }

    const removeMovieFromWatchlist = (movie_id) => {
        profileService
            .RemoveWatchlistId(user._id, movie_id)
            .then(() => {
                const updatedWatchlistMovies = movie.filter(movie => movie.id !== movie_id);
                setMovie(updatedWatchlistMovies);
            })
            .catch(err => console.log(err))
    }


    const GetMovies = (tickets) => {
        moviesService
            .GetMoviesFromTickets(tickets)
            .then(response => {
                const obj = {}
                response.data.forEach((elm) => {
                    obj[elm.movieInfo.id] = elm.movieInfo
                })
                setMovies(obj)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="container-profile">
            {
                !profile
                    ?
                    <Loader />
                    :
                    <>
                        <Row className="justify-content-center mt-4 mb-4">

                            <ProfileInfo profile={profile} />
                            <Col>
                                <Packs profile={profile} movies={movies} removieFromWatchList />
                                <hr />
                                <WatchList profile={profile} movie={movie} removeMovieFromWatchlist={removeMovieFromWatchlist} />

                            </Col>

                        </Row>
                    </>
            }
        </Container >

    )
}

export default ProfilePage