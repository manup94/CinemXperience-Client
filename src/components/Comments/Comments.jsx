import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { Form, Button } from "react-bootstrap"
import commentServices from "../../services/comments.services"
import profileService from "../../services/profile.services"


const Comments = ({ movie_id }) => {

    const { user } = useContext(AuthContext)

    const [comment, setComment] = useState({
        comment: '',
    })

    const [comments, setComments] = useState([])


    useEffect(() => {
        getAllComments()
    }, [])


    const handleInputChange = e => {
        const { name, value } = e.target
        setComment({ ...comment, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        commentServices
            .AddComment(movie_id, comment, user._id)
            .then(() => getAllComments())
            .catch(err => console.log(err))
    }

    const getAllComments = () => {
        commentServices
            .getAllComments()
            .then(({ data }) => {
                setComments(data)
            })
            .catch(err => console.log(err))
    }



    return (
        <div>
            <div>
                {

                    comments
                        ?.filter(comentario => comentario.movieId === movie_id)
                        .map(comentario => (
                            <div key={comentario._id}>
                                <p>{comentario.owner.username}</p>
                                <p>{comentario.message}</p>
                            </div>
                        ))
                }
            </div>
            {
                user &&
                <Form className='Comment-form' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="comment">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control type="text"
                            placeholder="Introduce un comentario"
                            value={comment.comment}
                            onChange={handleInputChange}
                            name='comment'
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Comentar
                    </Button>
                </Form>
            }
        </div>
    )

}

export default Comments