import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        const newPosts = res.data.posts.map(post => new Post(post))
        AppState.posts = newPosts
    }

    async getPostsByProfile(profileId) {
        const res = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log(res.data)
    }
}

export const postsService = new PostsService()