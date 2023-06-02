import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MovieCard.css'



const MovieCard = ({ moviesFetch, movie, _id }) => {


    return (

        <Card className='effect' style={{ width: '18rem' }}>
            <Link className='title' to={`/TopRatedMovie/${movie.id}`}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                    <Card.Body className='title-bg'>
                        {/* <Card.Title className='title'>{movie.title}</Card.Title> */}

                    </Card.Body>
                </Card>
            </Link>
        </Card>
    )
}

export default MovieCard;


