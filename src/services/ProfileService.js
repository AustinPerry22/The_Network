import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Profile } from "../models/Profile"

class ProfileService {
    async getProfile(profileId) {
        const res = await api.get('api/profiles/' + profileId)
        AppState.activeProfile = new Profile(res.data)
    }
}

export const profileService = new ProfileService()