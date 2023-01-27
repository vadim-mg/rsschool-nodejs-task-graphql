
import { Controller } from "./controller";
export class Profiles extends Controller {

  getProfiles = async () => {
    return await this.db.profiles.findMany()
  }


  getProfile = async (id: string) => {
    const result = await this.db.profiles.findOne({ key: 'id', equals: id })
    if (!result) {
      throw this.httpErrors.notFound(`Not found profile: ${id}`)
    }
    return result
  }


  addProfile = async (body: any) => {
    try {
      const memberType = await this.db.memberTypes.findOne({ key: 'id', equals: body.memberTypeId })
      if (!memberType) {
        throw this.httpErrors.badRequest('Not correct memberType')
      }
      const user = await this.db.users.findOne({ key: 'id', equals: body.userId })
      if (!user) {
        throw this.httpErrors.badRequest('User id not found')
      }
      const profile = await this.db.profiles.findOne({ key: 'userId', equals: body.userId })
      if (profile) {
        throw this.httpErrors.badRequest('This user already has profile')
      }

      return await this.db.profiles.create(body)
    } catch (error: any) {
      throw this.httpErrors.badRequest(error)
    }
  }


  updateProfile = async (id: string, body: any) => {
    try {
      if (body.memberTypeId) {
        const memberType = await this.db.memberTypes.findOne({ key: 'id', equals: body.memberTypeId })
        if (!memberType) {
          throw this.httpErrors.badRequest('Not correct memberType')
        }
      }
      return await this.db.profiles.change(id, body)
    } catch (error: any) {
      throw this.httpErrors.badRequest(error)
    }
  }


  deleteProfile = async (id: string) => {
    try {
      return await this.db.profiles.delete(id)
    } catch {
      throw this.httpErrors.badRequest()
    }
  }
}

