import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authService from './../../services/auth.services'
import FormError from "../FormError/FormError"
import uploadServices from '../../services/upload.services';
import { MessageContext } from "../../context/message.context"
import './SignupForm.css'

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: ''
    })

    const navigate = useNavigate()

    const { emitMessage } = useContext(MessageContext)

    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => {
                navigate('/profile')
                emitMessage('Usuario creado')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const handleFileUpload = e => {

        const formData = new FormData()
        formData.append('image', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setSignupData({ ...signupData, avatar: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }


    const { username, password, email } = signupData

    return (
        <div className={'form-container'}>

            <Form className={'form-card '} onSubmit={handleSubmit}>

                <Form.Group className="mb-3 form-input " controlId="username">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
                </Form.Group>

                <Form.Group className="mb-3 form-input " controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                </Form.Group>

                <Form.Group className="mb-3 form-input " controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
                </Form.Group>

                <Form.Group className="mb-3 form-input " controlId="image">
                    <Form.Label>Imagen (URL)</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>
                <div className="d-grid form-input ">
                    <Button variant="dark" type="submit">Registrarme</Button>
                </div>
                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

            </Form>
        </div>
    )
}

export default SignupForm
