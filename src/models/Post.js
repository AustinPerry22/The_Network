export class Post {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
        this.likes = data.likes
        this.body = data.body
    }
}