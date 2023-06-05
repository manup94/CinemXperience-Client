import axios from 'axios'

class MoviesService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/movies`
        })
    }

    getMovies() {
        return this.api.get('/list')
    }

    getOneMovie(id) {
        return this.api.get(`/movie/${id}`);
    }

    getTopRated(page) {
        return this.api.get(`/list/top_rated?page=${page}`)
    }

}

const moviesService = new MoviesService()

export default moviesService

