import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import authService from './../../services/auth.services'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from "../../context/auth.context"
import FormError from "../FormError/FormError"
import { MessageContext } from "../../context/message.context"
import './LoginForm.css'

const LoginForm = () => {

    const [errors, setErrors] = useState([])

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const { emitMessage } = useContext(MessageContext)

    const { authenticateUser, storeToken } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                emitMessage('Sesión Iniciada')
                navigate('/')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    const { password, email } = loginData

    return (
        <div className="form-container">
            <Form className="form-card" onSubmit={handleSubmit}>


                <Form.Group className="mb-3 form-input" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                </Form.Group>

                <Form.Group className="mb-3 form-input" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
                </Form.Group>


                <div className="d-grid form-input">
                    <Button variant="dark" type="submit">Acceder</Button>
                </div>

                <Link className="linkk" to={'/signup'}>Aun no tienes cuenta, click aqui</Link>

                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

            </Form>

        </div>



    )
}

export default LoginForm