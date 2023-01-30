
import { Controller } from "./controller"
export class Posts extends Controller {


  getPosts = async () => {
    return await this.db.posts.findMany()
  }


  getPost = async (id: string) => {
    const result = await this.db.posts.findOne({ key: 'id', equals: id })
    if (!result) {
      throw this.generateError(`Not found post: ${id}`, '404')
    }
    return result
  }


  addPost = async (body: any) => {
    try {
      const user = await this.db.users.findOne({ key: 'id', equals: body.userId })
      if (!user) {
        throw this.generateError('User id not found', '400')
      }

      return await this.db.posts.create(body)
    } catch (error: any) {
      throw this.generateError(error, '400')
    }
  }


  updatePost = async (id: string, body: any) => {
    try {
      return await this.db.posts.change(id, body)
    } catch (error: any) {
      throw this.generateError(error, '400')
    }
  }


  deletePost = async (id: string) => {
    try {
      return await this.db.posts.delete(id)
    } catch {
      throw this.generateError(undefined, '400')
    }
  }
}

