
import { HttpErrors } from "@fastify/sensible/lib/httpError";
import DB from "../utils/DB/DB";
class Users {
  private db: DB
  private httpErrors: HttpErrors

  constructor(db: DB, httpErrors: HttpErrors) {
    this.db = db
    this.httpErrors = httpErrors
  }


  getUsers = async () => {
    return await this.db.users.findMany()
  }


  getUser = async (id: string) => {
    const result = await this.db.users.findOne({ key: 'id', equals: id })
    if (!result) {
      throw this.httpErrors.notFound(`Not found user: ${id}`)
    }
    return result
  }


  addUser = async (body: any) => {
    try {
      const result = await this.db.users.create(body)
      return result
    } catch {
      throw this.httpErrors.badRequest()
    }
  }


  updateUser = async (id: string, body: any) => {
    try {
      return await this.db.users.change(id, body)
    } catch {
      throw this.httpErrors.badRequest()
    }
  }


  deleteUser = async (id: string) => {
    try {
      const subscribedUsers = await this.db.users.findMany()
      subscribedUsers.forEach(async (user) => {
        const indexOf = user.subscribedToUserIds.indexOf(id)
        if (indexOf >= 0) {
          user.subscribedToUserIds.splice(indexOf, 1)
          await this.db.users.change(user.id, { subscribedToUserIds: user.subscribedToUserIds })
        }
      })
      const profile = await this.db.profiles.findOne({ key: 'userId', equals: id })
      if (profile) {
        await this.db.profiles.delete(profile.id)
      }
      const posts = await this.db.posts.findMany({ key: 'userId', equals: id })
      posts.forEach(async (post) => {
        await this.db.posts.delete(post.id)
      })

      const result = await this.db.users.delete(id)
      return result
    } catch {
      throw this.httpErrors.badRequest(`Not found user: ${id}`)
    }
  }


  subscribeUserTo = async (id: string, subscribeId: string) => {
    const user = await this.db.users.findOne({ key: 'id', equals: id })
    if (!user) {
      throw this.httpErrors.badRequest(`Not found user: ${id}`)
    }

    const subscriber = await this.db.users.findOne({ key: 'id', equals: subscribeId })
    if (!subscriber) {
      throw this.httpErrors.badRequest(`Not found subscribing user: ${subscribeId}`)
    }

    if (id === subscribeId) {
      throw this.httpErrors.badRequest(`Can't subscribe to self`)
    }

    if (!subscriber.subscribedToUserIds.includes(id))
      subscriber.subscribedToUserIds.push(id)
    return await this.db.users.change(subscribeId, { subscribedToUserIds: subscriber.subscribedToUserIds })
  }


  unsubscribeUserFrom = async (id: string, subscribeId: string) => {
    const user = await this.db.users.findOne({ key: 'id', equals: id })
    if (!user) {
      throw this.httpErrors.badRequest(`Not found user: ${id}`)
    }

    const subscriber = await this.db.users.findOne({ key: 'id', equals: subscribeId })
    if (!subscriber) {
      throw this.httpErrors.badRequest(`Not found unsubscribing user: ${subscribeId}`)
    }

    const indexOf = subscriber.subscribedToUserIds.indexOf(id)
    if (indexOf < 0) {
      throw this.httpErrors.badRequest(`User isn't subscribed to: ${id}`)
    }

    subscriber.subscribedToUserIds.splice(indexOf, 1)
    return await this.db.users.change(subscribeId, { subscribedToUserIds: subscriber.subscribedToUserIds })
  }

}

export { Users }

