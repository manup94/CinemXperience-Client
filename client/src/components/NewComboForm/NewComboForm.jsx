import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import comboService from "../../services/combos.services"
import { useNavigate } from "react-router-dom"
import uploadServices from '../../services/upload.services';
import FormError from '../FormError/FormError';
import { MessageContext } from '../../context/message.context';
import './NewComboForm.css'


const NewComboForm = () => {

    const navigate = useNavigate()
    const [errors, setErrors] = useState([])


    const [comboData, setComboData] = useState({
        name: '',
        image: '',
        snacks: '',
        drinks: '',
        price: ''
    })

    const { emitMessage } = useContext(MessageContext)

    const handleInputChange = e => {
        const { name, value } = e.target
        setComboData({ ...comboData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        comboService
            .createCombo(comboData)
            .then(() => {
                emitMessage('Se ha creado un nuevo combo')
                navigate('/combos')
            })
            .catch(err => {
                setErrors(err.response.data.errorMessages)
            })

    }

    const handleFileUpload = e => {

        const formData = new FormData()
        formData.append('image', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setComboData({ ...comboData, image: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    return (
        <Form className='comboForm' onSubmit={handleSubmit}>
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
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
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

            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
            <Button variant="dark" type="submit">
                Crear
            </Button>
        </Form>
    )
}

export default NewComboForm