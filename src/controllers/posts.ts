
import { Controller } from "./controller"
export class Posts extends Controller {


  getPosts = async () => {
    return await this.db.posts.findMany()
  }


  getPost = async (id: string) => {
    const result = await this.db.posts.findOne({ key: 'id', equals: id })
    if (!result) {
      throw this.httpErrors.notFound(`Not found post: ${id}`)
    }
    return result
  }


  addPost = async (body: any) => {
    try {
      const user = await this.db.users.findOne({ key: 'id', equals: body.userId })
      if (!user) {
        throw this.httpErrors.badRequest('User id not found')
      }

      return await this.db.posts.create(body)
    } catch (error: any) {
      throw this.httpErrors.badRequest(error)
    }
  }


  updatePost = async (id: string, body: any) => {
    try {
      return await this.db.posts.change(id, body)
    } catch (error: any) {
      throw this.httpErrors.badRequest(error)
    }
  }


  deletePost = async (id: string) => {
    try {
      return await this.db.posts.delete(id)
    } catch {
      throw this.httpErrors.badRequest()
    }
  }
}

