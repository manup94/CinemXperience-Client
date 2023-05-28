import axios from 'axios'

class ComboService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/combos`
        })
    }


    getCombos() {
        return this.api.get('/getAllCombos')
    }

    getOneCombo(combo_id) {
        return this.api.get(`/${combo_id}/getOneCombo`)
    }

}

const comboService = new ComboService()

export default comboService

