import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MovieCard.css'



const MovieCard = ({ moviesFetch, movie, _id }) => {


    return (

        <Card className='effect' >
            <Link className='title' to={`/movies/${movie.id}`}>
                <Card >
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />

                </Card>
            </Link>
        </Card>
    )
}

export default MovieCard;


