import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ComboCard({ name, _id }) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Link to={`/combos/${_id}`} className='btn btn-dark btn-sm'>Detalles</Link>
                <button />
            </Card.Body>
        </Card>
    );
}

export default ComboCard;