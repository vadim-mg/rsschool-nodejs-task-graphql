import { HttpErrors } from "@fastify/sensible/lib/httpError";
import { FastifyInstance } from "fastify";
import { GraphQLError } from "graphql";
import DB from "../utils/DB/DB";


export class Controller {
  protected db: DB
  protected httpErrors: HttpErrors
  protected isGql: boolean

  constructor(fastify: FastifyInstance, isGql: boolean = false) {
    this.db = fastify.db
    this.httpErrors = fastify.httpErrors
    this.isGql = isGql
  }

  generateError = (message?: string, type?: string) => {
    if (this.isGql) {
      throw new GraphQLError(message ?? 'Unknown error')
    }
    switch (type) {
      case '400':
        throw this.httpErrors.badRequest(message)
      case '404':
        throw this.httpErrors.notFound(message)
      default:
        throw Error(message)
    }
  }

}