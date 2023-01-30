
import { Controller } from "./controller"

export class MemberTypes extends Controller {

  getMemberTypes = async () => {
    return await this.db.memberTypes.findMany()
  }


  getMemberType = async (id: string) => {
    const result = await this.db.memberTypes.findOne({ key: 'id', equals: id })
    if (!result) {
      throw this.generateError(`Not found user: ${id}`, '404')
    }
    return result
  }


  updateMemberType = async (id: string, body: any) => {
    try {
      return await this.db.memberTypes.change(id, body)
    } catch {
      throw this.generateError('Bad Request!', '400')
    }
  }
}

