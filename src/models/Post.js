export class Post {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.createdAt = new Date(data.createdAt).toLocaleDateString()
        this.updatedAt = new Date(data.updatedAt).toLocaleDateString()
        this.likes = data.likeIds || null
        this.imgUrl = data.imgUrl
        this.body = data.body
    }
}