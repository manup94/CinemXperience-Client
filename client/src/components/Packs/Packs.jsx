import { Link } from "react-router-dom"
import * as Collapsible from '@radix-ui/react-collapsible';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Col } from "react-bootstrap"
import { useState } from "react"
import './Packs.css'

const { formatDate } = require('../../utils/formatDate');


const Packs = ({ profile, movies }) => {


    const [open, setOpen] = useState(false);

    const baseImageUrl = 'https://image.tmdb.org/t/p/original'


    return (
        <Col className="pack-container">
            <div className="d-flex mb-3 justify-content-center align-items-center text-center">
                <img className="logo" src="../../../ticket.png" alt="ticket" />
                <h2 style={{ color: 'white' }}>Tus entradas</h2>
            </div>
            <hr />

            <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h4 style={{ color: 'white' }}>
                        {profile?.username} tienes {profile?.packs.length} entradas
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

    )



}

export default Packs


