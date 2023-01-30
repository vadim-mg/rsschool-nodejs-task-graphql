import { GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import DB from "../utils/DB/DB";


export class ProfileType extends GraphQLObjectType {
  constructor(db: DB) {
    super({
      name: 'Profile',
      fields: () => ({
        'id': {
          type: GraphQLID
        },
        'avatar': {
          type: GraphQLString
        },
        'sex': {
          type: GraphQLString
        },
        'birthday': {
          type: GraphQLInt
        },
        'country': {
          type: GraphQLString
        },
        'street': {
          type: GraphQLString
        },
        'city': {
          type: GraphQLString
        },
        'memberTypeId': {
          type: GraphQLID
        },
        'userId': {
          type: GraphQLID
        },
      })
    })
  }
}



export const ProfileInputCreateType = new GraphQLInputObjectType({
  name: 'ProfileInputCreate',
  description: 'InputObjectType for DTO.',
  fields: {
    'avatar': {
      type: new GraphQLNonNull(GraphQLString)
    },
    'sex': {
      type: new GraphQLNonNull(GraphQLString)
    },
    'birthday': {
      type: new GraphQLNonNull(GraphQLInt)
    },
    'country': {
      type: new GraphQLNonNull(GraphQLString)
    },
    'street': {
      type: new GraphQLNonNull(GraphQLString)
    },
    'city': {
      type: new GraphQLNonNull(GraphQLString)
    },
    'memberTypeId': {
      type: new GraphQLNonNull(GraphQLID)
    },
    'userId': {
      type: new GraphQLNonNull(GraphQLID)
    },
  },
})


export const ProfileInputUpdateType = new GraphQLInputObjectType({
  name: 'ProfileInputUpdate',
  description: 'InputObjectType for DTO.',
  fields: {
    'avatar': {
      type: GraphQLString
    },
    'sex': {
      type: GraphQLString
    },
    'birthday': {
      type: GraphQLInt
    },
    'country': {
      type: GraphQLString
    },
    'street': {
      type: GraphQLString
    },
    'city': {
      type: GraphQLString
    },
    'memberTypeId': {
      type: GraphQLID
    },
  },
})