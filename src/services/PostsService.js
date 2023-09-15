import axios from "axios"
import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.older = res.data.older
        AppState.newer = res.data.newer

    }

    async getPostsByProfile(profileId) {
        AppState.posts = []
        const res = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.older = res.data.older
        AppState.newer = res.data.newer
    }

    async changePosts(url) {
        const res = await axios.get(url)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.older = res.data.older
        AppState.newer = res.data.newer
    }
}

export const postsService = new PostsService()