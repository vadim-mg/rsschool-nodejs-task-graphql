import { HttpErrors } from "@fastify/sensible/lib/httpError";
import { FastifyInstance } from "fastify";
import DB from "../utils/DB/DB";

 export class Controller {
  protected db: DB
  protected httpErrors: HttpErrors

  constructor(fastify:FastifyInstance) {
    this.db = fastify.db
    this.httpErrors = fastify.httpErrors
  }
}