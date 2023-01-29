import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import DB from "../utils/DB/DB";


export class ProfileType extends GraphQLObjectType {
  constructor(db: DB) {
    super({
      name: 'profile',
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