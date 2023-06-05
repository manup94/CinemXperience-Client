import { Link, useNavigate } from "react-router-dom"
import * as Collapsible from '@radix-ui/react-collapsible';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useState } from "react"
import './WatchList.css'


const WatchList = ({ profile, movie, removeMovieFromWatchlist }) => {


    const [openWatchList, setOpenWatchList] = useState(false)

    const baseImageUrl = 'https://image.tmdb.org/t/p/original'

    return (
        <Col className='watchList-container'>
            <div className="d-flex mb-5 justify-content-center align-items-center text-center">
                <img className="logo" src="../../../clipboard.png" alt="ticket" />
                <h2 style={{ color: 'white' }}>Tus lista de peliculas</h2>
            </div>
            <Collapsible.Root className="CollapsibleRoot" open={openWatchList} onOpenChange={setOpenWatchList}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h4 style={{ color: 'white' }}>
                        {profile.username} tienes {movie.length} Peliculas pendientes
                    </h4>
                    <Collapsible.Trigger asChild>
                        <button style={{ marginLeft: '30px' }} className="IconButton">{openWatchList ? <Cross2Icon /> : <RowSpacingIcon />}</button>
                    </Collapsible.Trigger>
                </div>
                <Collapsible.Content>
                    {
                        <Card.Text>
                            <div className="d-flex flex-wrap justify-content-center">
                                {movie.map((movie) => (
                                    <Col xs={4} key={movie.id} className="m-2">
                                        <div className="movie-card">
                                            <Link to={`/TopRatedMovie/${movie.id}`}>
                                                <img src={`${baseImageUrl}${movie.poster_path}`} alt="movie-img" />
                                            </Link>

                                            <Button onClick={() => removeMovieFromWatchlist(movie.id)}>Remove</Button>
                                        </div>
                                    </Col>
                                ))}
                            </div>
                        </Card.Text>
                    }

                </Collapsible.Content>
            </Collapsible.Root>
        </Col>

    )


}

export default WatchList