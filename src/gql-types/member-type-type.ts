import { GraphQLID, GraphQLInt, GraphQLObjectType } from "graphql";
import DB from "../utils/DB/DB";

export class MemberTypeType extends GraphQLObjectType {
  constructor(db: DB) {
    super({
      name: 'memberType',
      fields: () => ({
        'id': {
          type: GraphQLID
        },
        'discount': {
          type: GraphQLInt
        },
        'monthPostsLimit': {
          type: GraphQLInt
        },
      })
    })
  }
}