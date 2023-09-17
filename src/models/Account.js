export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.class = data.class
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    this.coverImg = data.coverImg
    // TODO add additional properties if needed
  }
}
