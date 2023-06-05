import { useContext, useEffect, useState } from "react"
import { AuthContext } from './../../context/auth.context'
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import './ProfilePage.css'
import profileService from "../../services/profile.services"
import { Link, useNavigate } from "react-router-dom"
import moviesService from "../../services/movies.services"
import * as Collapsible from '@radix-ui/react-collapsible';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
const { formatDate } = require('../../utils/formatDate');

const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [profile, setProfile] = useState()

    const [pack, setPack] = useState([])

    const [fetched, setFetched] = useState(false)

    const [movies, setMovies] = useState({})

    const [open, setOpen] = useState(false);

    const baseImageUrl = 'https://image.tmdb.org/t/p/original'


    useEffect(() => {
        getUserInfo()

    }, [])



    const getUserInfo = () => {
        profileService
            .getOneProfile(user._id)
            .then(({ data }) => {
                setProfile(data);
                GetMovies(data.packs.map((pack) => {
                    console.log(pack.ticket);
                    return pack.ticket
                }))

            })
            .catch((err) => console.log(err));
    };

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
                    <h1>Hello there</h1>
                    :
                    <>
                        <Container fluid>
                            <Row className="justify-content-center mt-4 mb-4">
                                <Col className="profile-details" xs={10} sm={8} md={6} lg={4}>
                                    <Card className="shadow profile-img">
                                        <Card.Img variant="top" src={profile.avatar} alt="Image" />
                                        <Card.Body>
                                            <Card.Title className="text-center">{profile.username}</Card.Title>
                                            <Card.Text as="div">
                                                {profile.email}

                                                <div className='justify-content-end'>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Link to={`/profile/${user._id}/edit`} style={{ paddingTop: '15px' }}>
                                                            <Button variant="dark"> Edit</Button>
                                                        </Link>
                                                    </div>
                                                </ div>

                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="packs-list">
                                    <h2 style={{ color: 'white' }}>Tus entradas:</h2>
                                    <hr />

                                    <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <h4 style={{ color: 'white' }}>
                                                {profile.username} tienes {profile.packs.length} entradas
                                            </h4>
                                            <Collapsible.Trigger asChild>
                                                <button style={{ marginLeft: '30px' }} className="IconButton">{open ? <Cross2Icon /> : <RowSpacingIcon />}</button>
                                            </Collapsible.Trigger>
                                        </div>
                                        <Collapsible.Content>
                                            {
                                                profile?.packs.map((pack) => {
                                                    return <div className="Repository">
                                                        <Link className="reset-link" to={`/movies/${movies[pack.ticket.movieId]?.id}`}>
                                                            <img className="movie-img" src={`${baseImageUrl}${movies[pack.ticket.movieId]?.poster_path}`} alt="img" />

                                                        </Link>
                                                        <div>
                                                            <div>
                                                                <h4>{movies[pack.ticket.movieId]?.title} </h4>
                                                                <p>Fecha de la sesión: {formatDate(pack.ticket.movieDate)} </p>
                                                            </div>
                                                            <div >
                                                                <h4>{pack.combo.name}</h4>
                                                                <p>Snacks: {pack.combo.snacks}</p>
                                                                <p>Bebida:{pack.combo.drinks}</p>

                                                            </div>
                                                        </div>
                                                        <Link to={'/combos'} className="reset-link" >
                                                            <img className="movie-img" src={pack.combo.image} alt="img" />

                                                        </Link>


                                                    </div>
                                                })
                                            }

                                        </Collapsible.Content>
                                    </Collapsible.Root>

                                </Col>

                            </Row>
                        </Container>
                    </>
            }
        </Container>

    )
}

export default ProfilePage