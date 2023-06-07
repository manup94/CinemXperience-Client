import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TopMovieCard.css'



const TopMovieCard = ({ movie }) => {


    return (

        <Card className='effect' style={{ width: '18rem' }}>
            <Link className='title' to={`/TopRatedMovie/${movie.id}`}>
                <Card style={{ width: '18rem', height: '430px' }}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                    <Card.Body className='title-bg'>
                    </Card.Body>
                </Card>
            </Link>
        </Card>
    )
}

export default TopMovieCard;