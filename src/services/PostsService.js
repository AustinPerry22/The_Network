import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        const newPosts = res.data.posts.map(post => new Post(post))
        AppState.posts = newPosts
        logger.log(res.data.posts)
    }

    async getPostsByProfile(profileId) {
        AppState.posts = []
        const res = await api.get(`api/posts?creatorId=${profileId}`)
        AppState.posts = res.data.posts.map(post => new Post(post))
        logger.log(res.data.posts)
    }
}

export const postsService = new PostsService()