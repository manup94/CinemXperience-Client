import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import comboService from "../../services/combos.services"
import { useNavigate } from "react-router-dom"



const NewComboForm = () => {

    const navigate = useNavigate()


    const [comboData, setComboData] = useState({
        name: '',
        image: '',
        snacks: '',
        drinks: '',
        price: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setComboData({ ...comboData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        comboService
            .createCombo(comboData)
            .then(({ data }) => navigate('/profile'))
            .catch(err => console.log(err))

    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter combo name"
                    value={comboData.name}
                    onChange={handleInputChange}
                    name='name'
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Imagen:</Form.Label>
                <Form.Control type="string"
                    value={comboData.image}
                    onChange={handleInputChange}
                    name='image'
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="snacks">
                <Form.Label>Snacks:</Form.Label>
                <Form.Control type="string"
                    value={comboData.snacks}
                    onChange={handleInputChange}
                    name='snacks'
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="drinks">
                <Form.Label>Bebida:</Form.Label>
                <Form.Control type="string"
                    value={comboData.drinks}
                    onChange={handleInputChange}
                    name='drinks'
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Precio:</Form.Label>
                <Form.Control type="string"
                    value={comboData.price}
                    onChange={handleInputChange}
                    name='price'
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Crear
            </Button>
        </Form>
    )
}

export default NewComboForm