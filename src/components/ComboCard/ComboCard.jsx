import { Card, Button, Accordion } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import './ComboCard.css'
import comboService from "../../services/combos.services"
import { AuthContext } from './../../context/auth.context'
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as HoverCard from '@radix-ui/react-hover-card';




const ComboCard = ({ name, snacks, drinks, _id, fetchCombos, price, image }) => {

    const { user } = useContext(AuthContext)

    const handleClick = () => {
        comboService
            .deleteCombo(_id)
            .then(() => fetchCombos())
            .catch((error) => console.log(error))
    };

    return (

        // TODO: QUITAR TODOS LOS style = {{ width: '18rem' }} DE LAS CARDS

        <Card >

            <HoverCard.Root openDelay={0} closeDelay={0}>
                <HoverCard.Trigger asChild>
                    <Card >
                        <Card.Img className='card-image' variant="top" src={image} />
                        <Card.Body className='title-bg'>
                            <Card.Title className='title'>{name}</Card.Title>
                        </Card.Body>
                    </Card>

                </HoverCard.Trigger>
                <HoverCard.Portal>
                    <HoverCard.Content className="HoverCardContent" sideOffset={5}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                            <div className='header-card'>
                                <img
                                    className="Image large"
                                    src={image}
                                    alt="Radix UI"
                                />

                                <div className="Text bolder">{name}</div>


                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>

                                <div className="Text">
                                    Disfruta de nuestro servicio VIP , te lo llevamos a tu asiento.
                                    <p>- {snacks}</p>
                                    <p>- {drinks}</p>
                                </div>
                                <div style={{ display: 'flex', gap: 15 }}>
                                    <div style={{ display: 'flex', gap: 5 }}>
                                        <div className="Text bold">Precio: {price}€</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <HoverCard.Arrow className="HoverCardArrow" />
                    </HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
            {
                user?.role === 'ADMIN'
                &&
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


            }




        </Card>
    )
}

export default ComboCard;





