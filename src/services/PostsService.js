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
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.older = res.data.older
        AppState.newer = res.data.newer
    }

    async changePosts(url) {
        const res = await api.get(url)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.older = res.data.older
        AppState.newer = res.data.newer
    }

    async createPost(post){
        const res = await api.post('api/posts', post)
        const newPost = new Post(res.data)
        AppState.posts.unshift(newPost)
    }

    async deletePost(postId){
        await api.delete(`api/posts/${postId}`)
        const postIndex = AppState.posts.findIndex(post => post.id == postId)
        if(postIndex >= 0){
            AppState.posts.splice(postIndex, 1)
        }
    }
}

export const postsService = new PostsService()