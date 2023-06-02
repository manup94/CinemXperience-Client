import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import authService from '../../services/auth.services'
import FormError from "../FormError/FormError"
import uploadServices from '../../services/upload.services';
import profileService from "../../services/profile.services"
import Loader from "../Loader/Loader"

const EditProfileForm = () => {

    const { profile_id } = useParams()

    const [loadingImage, setLoadingImage] = useState(false)

    const [editProfileData, setEditProfileData] = useState({
        username: '',
        email: '',
        avatar: ''
    })

    const navigate = useNavigate()

    const [errors, setErrors] = useState([])

    useEffect(() => {
        loadUser()
    }, [])

    const handleInputChange = e => {
        const { value, name } = e.target
        setEditProfileData({ ...editProfileData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        profileService
            .editOneProfile(profile_id, editProfileData)
            .then(({ data }) => {
                setEditProfileData(data)
                navigate('/profile')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const loadUser = () => {
        profileService
            .getOneProfile(profile_id)
            .then(({ data }) => setEditProfileData(data))
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('image', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setEditProfileData({ ...editProfileData, avatar: data.cloudinary_url })
                setLoadingImage(false)
            })

            .catch(err => setErrors(err.response.data.errorMessages))
    }


    const { username, email, avatar } = editProfileData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? <Loader /> : 'Editar información'}</Button>
            </div>
            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

        </Form>
    )
}

export default EditProfileForm
