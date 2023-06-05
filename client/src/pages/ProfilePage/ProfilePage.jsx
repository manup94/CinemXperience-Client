import { useContext, useEffect, useState } from "react"
import { AuthContext } from './../../context/auth.context'
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import './ProfilePage.css'
import profileService from "../../services/profile.services"
import { Link } from "react-router-dom"
import moviesService from "../../services/movies.services"
import Loader from "../../components/Loader/Loader"

const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [profile, setProfile] = useState()

    const [movie, setMovie] = useState([])

    const [pack, setPack] = useState([])

    const basePosterUrl = 'https://image.tmdb.org/t/p/w200'

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = () => {
        profileService
            .getOneProfile(user._id)
            .then(({ data }) => {
                setProfile(data);
                getWatchlist(data.watchList)
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


    return (
        <Container>
            {
                !profile
                    ?
                    <Loader />
                    :
                    <Container fluid>
                        <Row className="justify-content-center mt-4 mb-4">
                            <Col xs={10} sm={8} md={6} lg={4}>
                                <Card className="shadow">
                                    <Card.Img variant="top" src={profile.avatar} alt="Image" />
                                    <Card.Body>
                                        <Card.Title className="text-center">{profile.username}</Card.Title>
                                        <Card.Text as="div">
                                            {profile.email}

                                            <div className='justify-content-end'>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Link to={`/profile/${user._id}/edit`} style={{ paddingTop: '15px' }}>
                                                        <Button> Edit</Button>
                                                    </Link>
                                                </div>
                                            </ div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xs={10} sm={8} md={6} lg={4}>
                                <Card className="shadow">
                                    <Card.Body>
                                        <Card.Title>Watchlist</Card.Title>
                                        <Card.Text>
                                            <div className="d-flex flex-wrap justify-content-center">
                                                {movie.map((movie) => (
                                                    <Col xs={4} key={movie.id} className="m-2">
                                                        <div className="movie-card">
                                                            <img src={`${basePosterUrl}${movie.poster_path}`} alt="" />
                                                            <div className="movie-title">{movie.title}</div>
                                                            <Button onClick={() => removeMovieFromWatchlist(movie.id)}>Remove</Button>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
            }
        </Container >

    )
}

export default ProfilePage