import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import comboService from "../../services/combos.services"
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import './ComboCard.css'


const ComboCard = ({ name, _id, fetchCombos, image }) => {

    const handleClick = () => {
        comboService
            .deleteCombo(_id)
            .then(() => fetchCombos())
            .catch((error) => console.log(error))
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Link to={`/combos/${_id}`} className='btn btn-dark btn-sm'>Detalles</Link>
                <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                        <Button className='btn btn-danger btn-sm' >Delete</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        < AlertDialog.Overlay className="overlay" />
                        <AlertDialog.Content className="content">
                            <AlertDialog.Title className="AlertDialogTitle">¿Estas completamente seguro?</AlertDialog.Title>
                            <AlertDialog.Description className="AlertDialogDescription">
                                Esta accion no se puede deshacer, se eliminara completamente de la base de datos
                            </AlertDialog.Description>
                            <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                                <AlertDialog.Cancel asChild>
                                    <Button variant="dark" >Cancel</Button >
                                </AlertDialog.Cancel>
                                <AlertDialog.Action asChild>
                                    <Button variant="danger" onClick={handleClick} >Si, eliminar combo</Button>
                                </AlertDialog.Action>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            </Card.Body>
        </Card>
    );
}

export default ComboCard;


