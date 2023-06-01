import axios from 'axios'

class PassService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/pass`
        })
    }
    getAllPass() {
        return this.api.get('/getAllPass')
    }

    getOnePass(_id) {
        return this.api.get(`${_id}/getOnePass`)
    }

    createPass(passData) {
        return this.api.post('/createNewPass', passData)
    }

    deletePass(_id) {
        return this.api.delete(`/${_id}/delete`)
    }


}

const passService = new PassService()

export default passService

