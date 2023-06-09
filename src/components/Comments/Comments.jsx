import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { Form, Button, Col } from "react-bootstrap"
import commentServices from "../../services/comments.services"
import profileService from "../../services/profile.services"
import Loader from "../../components/Loader/Loader"
import './comments.css'


const Comments = ({ movie_id }) => {

    const { user } = useContext(AuthContext)

    const [comment, setComment] = useState({
        comment: '',
    })

    const [comments, setComments] = useState([])

    const commentsContainerRef = useRef(null);



    useEffect(() => {
        // Hacer scroll hacia abajo cuando se agrega un nuevo comentario
        if (commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
    }, [comments]);



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
            .then(() => {
                getAllComments()
                setComment({ comment: '' })
            })
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

        <Col className="comments-container m-5">
            <div ref={commentsContainerRef} className="comments" style={{ maxHeight: '470px', overflowY: 'scroll' }}>
                {comments
                    ?.filter(comentario => comentario.movieId === movie_id)
                    .map(comentario => (
                        <div className="comment" key={comentario._id}>
                            <p className="comment-text">{comentario.message}</p>
                            <p className="userText">{comentario.owner.username}</p>
                        </div>
                    ))}
            </div>
            {user && (
                <Form className="comments-form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="comment">
                        <Form.Control
                            type="text"
                            placeholder="Introduce un comentario"
                            value={comment.comment}
                            onChange={handleInputChange}
                            name="comment"
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Comentar
                    </Button>
                </Form>
            )}
        </Col>


    )

}

export default Comments