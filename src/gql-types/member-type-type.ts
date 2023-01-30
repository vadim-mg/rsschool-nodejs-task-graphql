import { GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from "graphql";
import DB from "../utils/DB/DB";

export class MemberTypeType extends GraphQLObjectType {
  constructor(db: DB) {
    super({
      name: 'MemberType',
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

export const MemberTypeInputUpdateType = new GraphQLInputObjectType({
  name: 'MemberTypeInputUpdate',
  description: 'InputObjectType for DTO.',
  fields: {
    'discount': { type: GraphQLInt },
    'monthPostsLimit': { type: GraphQLInt },
  },
})
