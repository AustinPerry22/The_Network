import { logger } from "../utils/Logger"



class PostsService {
    async getPosts() {
        logger.log('getting posts')
    }
}

export const postsService = new PostsService()