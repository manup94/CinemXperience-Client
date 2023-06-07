import axios from 'axios'

class StripeServices {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/stripe`
        })
    }

    createCheckoutSesion() {
        return this.api.post('/crear-sesion-pago')
    }
}

const stripeServices = new StripeServices()

export default stripeServices