import axios from 'axios'

class CommentServices {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/comments`
        })

        // token available on server in any request
        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");
            if (storedToken) {
                config.headers = {
                    Authorization: `Bearer ${storedToken}`
                }
            }

            return config
        })

    }

    // getAllComments() {
    //     return this.api.get('/getAllComments')
    // }

    AddComment(movieId, message) {
        return this.api.post(`/addComments/${movieId}`, message)
    }

    // DeleteComment(comment_id) {
    //     return this.api.delete(`/ deleteComment / ${ comment_id }`)
    // }

}

const commentServices = new CommentServices()

export default commentServices