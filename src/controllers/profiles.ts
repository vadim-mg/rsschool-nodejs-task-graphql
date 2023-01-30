
import { Controller } from "./controller";
export class Profiles extends Controller {

  getProfiles = async () => {
    return await this.db.profiles.findMany()
  }


  getProfile = async (id: string) => {
    const result = await this.db.profiles.findOne({ key: 'id', equals: id })
    if (!result) {
      throw this.generateError(`Not found profile: ${id}`,'404')
    }
    return result
  }


  addProfile = async (body: any) => {
    try {
      const memberType = await this.db.memberTypes.findOne({ key: 'id', equals: body.memberTypeId })
      if (!memberType) {
        throw this.generateError('Not correct memberType', '400')
      }
      const user = await this.db.users.findOne({ key: 'id', equals: body.userId })
      if (!user) {
        throw this.generateError('User id not found', '400')
      }
      const profile = await this.db.profiles.findOne({ key: 'userId', equals: body.userId })
      if (profile) {
        throw this.generateError('This user already has profile', '400')
      }

      return await this.db.profiles.create(body)
    } catch (error: any) {
      throw this.generateError(error, '400')
    }
  }


  updateProfile = async (id: string, body: any) => {
    try {
      if (body.memberTypeId) {
        const memberType = await this.db.memberTypes.findOne({ key: 'id', equals: body.memberTypeId })
        if (!memberType) {
          throw this.generateError('Not correct memberType', '400')
        }
      }
      return await this.db.profiles.change(id, body)
    } catch (error: any) {
      throw this.generateError(error, '400')
    }
  }


  deleteProfile = async (id: string) => {
    try {
      return await this.db.profiles.delete(id)
    } catch {
      throw this.generateError(undefined, '400')
    }
  }
}

