import axios from 'axios'

class PassService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/pass`
        })
    }




}

const passService = new PassService()

export default passService

