import axios from "axios";

class ProfileService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/profile`
        })
    }

    getOneProfile(profile_id) {
        return this.api.get(`/${profile_id}/getOneProfile`)
    }
}

const profileService = new ProfileService()

export default profileService