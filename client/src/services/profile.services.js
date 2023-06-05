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

    getTickets(profile_id, tickets, combo) {
        return this.api.put(`/${profile_id}/getTickets`, tickets, combo)

    }
    editOneProfile(profile_id, editedProfileData) {
        return this.api.put(`/${profile_id}/edit`, editedProfileData)
    }

    getPackDetails(pack_id) {
        return this.api.get(`/${pack_id}/getPackDetails`)
    }

    AddWatchlistId(profile_id, movie_id) {
        return this.api.post(`/${movie_id}/AddWatchlistId`, { profile_id })
    }

    RemoveWatchlistId(profile_id, movie_id) {
        return this.api.put(`/${movie_id}/removeMovieFromWatchlist`, { profile_id })
    }
}

const profileService = new ProfileService()

export default profileService