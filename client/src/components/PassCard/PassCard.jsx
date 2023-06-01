import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import passService from "../../services/pass.services"
import moviesServices from '../../services/movies.services'
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import './PassCard.css'
import { useEffect, useState } from 'react';
const { formatDate } = require('../../utils/formatDate');



const PassCard = ({ date, img, _id, fetchPasses }) => {


    const handleClick = () => {
        passService
            .deletePass(_id)
            .then(() => fetchPasses())
            .catch((error) => console.log(error))
    };

    return (

        <Card style={{ width: '18rem' }}>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${img}`} />
                <Card.Body className='title-bg'>
                    <Card.Title className='date'>{formatDate(date)}</Card.Title>
                </Card.Body>

            </Card>

            <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                    <Button className='btn btn-danger btn-sm' >Eliminar</Button>
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
                                <Button variant="danger" onClick={handleClick} >Si, eliminar sesion</Button>
                            </AlertDialog.Action>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </Card>
    )
}

export default PassCard;


