
import { HttpErrors } from "@fastify/sensible/lib/httpError";
import DBMemberTypes, { ChangeMemberTypeDTO } from "../utils/DB/entities/DBMemberTypes";

export class MemberTypes {
  private memberTypes: DBMemberTypes
  private httpErrors: HttpErrors

  constructor(memberTypes: DBMemberTypes, httpErrors: HttpErrors) {
    this.memberTypes = memberTypes
    this.httpErrors = httpErrors
  }


  getMemberTypes = async () => {
    return await this.memberTypes.findMany()
  }


  getMemberType = async (id: string) => {
    const result = await this.memberTypes.findOne({ key: 'id', equals: id })
    if (!result) {
      throw this.httpErrors.notFound(`Not found user: ${id}`)
    }
    return result
  }


  updateMemberType = async (id: string, body: ChangeMemberTypeDTO) => {
    try {
      return await this.memberTypes.change(id, body)
    } catch {
      throw this.httpErrors.badRequest()
    }
  }
}

