import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import DB from "../utils/DB/DB";

export class PostType extends GraphQLObjectType {
  constructor(db: DB) {
    super({
      name: 'Post',
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

export const PostInputCreateType = new GraphQLInputObjectType({
  name: 'PostInputCreate',
  description: 'InputObjectType for DTO.',
  fields: {
    'title': {
      type: new GraphQLNonNull(GraphQLString)
    },
    'content': {
      type: new GraphQLNonNull(GraphQLString)
    },
    'userId': {
      type: new GraphQLNonNull(GraphQLID)
    },
  },
})

export const PostInputUpdateType = new GraphQLInputObjectType({
  name: 'PostInputUpdate',
  description: 'InputObjectType for DTO.',
  fields: {
    'title': {
      type: GraphQLString
    },
    'content': {
      type: GraphQLString
    },
  },
})