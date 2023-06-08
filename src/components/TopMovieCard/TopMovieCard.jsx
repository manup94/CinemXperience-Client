import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TopMovieCard.css'

const TopMovieCard = ({ id, poster_path }) => {

    return (
        <Card className='effect' >
            <Link className='title' to={`/TopRatedMovie/${id}`}>
                <Card >
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${poster_path}`} />
                </Card>
            </Link>
        </Card>
    )
}

export default TopMovieCard;