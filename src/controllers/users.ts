
import { Controller } from "./controller";

export class Users extends Controller {

  getUsers = async () => {
    return await this.db.users.findMany()
  }


  getUser = async (id: string) => {
    const result = await this.db.users.findOne({ key: 'id', equals: id })
    if (!result) {
      throw this.generateError(`Not found user: ${id}`,'404')
    }
    return result
  }


  addUser = async (body: any) => {
    try {
      return await this.db.users.create(body)
    } catch {
      throw this.generateError(undefined, '400')
    }
  }


  updateUser = async (id: string, body: any) => {
    try {
      return await this.db.users.change(id, body)
    } catch {
      throw this.generateError(undefined, '400')
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

      return await this.db.users.delete(id)
    } catch {
      throw this.generateError(`Not found user: ${id}`, '400')
    }
  }


  subscribeUserTo = async (id: string, subscribeId: string) => {
    const user = await this.db.users.findOne({ key: 'id', equals: id })
    if (!user) {
      throw this.generateError(`Not found user: ${id}`, '400')
    }

    const subscriber = await this.db.users.findOne({ key: 'id', equals: subscribeId })
    if (!subscriber) {
      throw this.generateError(`Not found subscribing user: ${subscribeId}`, '400')
    }

    if (id === subscribeId) {
      throw this.generateError(`Can't subscribe to self`, '400')
    }

    if (!subscriber.subscribedToUserIds.includes(id))
      subscriber.subscribedToUserIds.push(id)

    return await this.db.users.change(
      subscribeId,
      { subscribedToUserIds: subscriber.subscribedToUserIds }
    )
  }


  unsubscribeUserFrom = async (id: string, subscribeId: string) => {
    const user = await this.db.users.findOne({ key: 'id', equals: id })
    if (!user) {
      throw this.generateError(`Not found user: ${id}`, '400')
    }

    const subscriber = await this.db.users.findOne({ key: 'id', equals: subscribeId })
    if (!subscriber) {
      throw this.generateError(`Not found unsubscribing user: ${subscribeId}`, '400')
    }

    const indexOf = subscriber.subscribedToUserIds.indexOf(id)
    if (indexOf < 0) {
      throw this.generateError(`User isn't subscribed to: ${id}`, '400')
    }

    subscriber.subscribedToUserIds.splice(indexOf, 1)

    return await this.db.users.change(
      subscribeId,
      { subscribedToUserIds: subscriber.subscribedToUserIds }
    )
  }
}

