import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import DB from "../utils/DB/DB";

export class PostType extends GraphQLObjectType {
  constructor(db: DB) {
    super({
      name: 'post',
      fields: () => ({
        'id': {
          type: GraphQLID
        },
        'title': {
          type: GraphQLString
        },
        'content': {
          type: GraphQLString
        },
        'userId': {
          type: GraphQLID
        },
      })
    })
  }
}