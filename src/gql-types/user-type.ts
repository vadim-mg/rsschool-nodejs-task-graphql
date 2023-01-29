import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import DB from "../utils/DB/DB";


export class UserType extends GraphQLObjectType {
  constructor(
    db: DB,
    postType: GraphQLObjectType,
    profileType: GraphQLObjectType,
    memberTypeType: GraphQLObjectType
  ) {
    super({
      name: 'user',
      fields: () => ({
        'id': {
          type: GraphQLID
        },
        'firstName': {
          type: GraphQLString
        },
        'lastName': {
          type: GraphQLString
        },
        'email': {
          type: GraphQLString
        },
        'subscribedToUserIds': {
          type: new GraphQLList(GraphQLID)
        },
        'userSubscribedTo': {
          type: new GraphQLList(this),
          resolve: async (source, args) =>
            await source.subscribedToUserIds
              .map(async (id: any) =>
                await db.users.findOne({ key: 'id', equals: id })
              )
        },
        'subscribedToUser': {
          type: new GraphQLList(this),
          resolve: async (source, args) =>
            await db.users.findMany({ key: 'subscribedToUserIds', inArray: source.id })
        },
        'posts': {
          type: new GraphQLList(postType),
          resolve: async (source, args) =>
            await db.posts.findMany({ key: 'userId', equals: source.id })
        },
        'profile': {
          type: profileType,
          resolve: async (source, args) =>
            await db.profiles.findOne({ key: 'userId', equals: source.id })
        },
        'memberType': {
          type: memberTypeType,
          resolve: async (source, args) => {
            const memberTypeId = await db.profiles
              .findOne({ key: 'userId', equals: source.id })
              .then(profile => profile?.memberTypeId)
            return memberTypeId
              ? await db.memberTypes.findOne({ key: 'id', equals: memberTypeId })
              : null
          }
        }
      })
    })
  }
}