import { Controller } from "./controller";
import { FastifyInstance } from "fastify";
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { MemberTypeType } from "../gql-types/member-type-type";
import { UserType, UserInputCreateType, UserInputUpdateType } from "../gql-types/user-type";
import { ProfileInputCreateType, ProfileInputUpdateType, ProfileType } from "../gql-types/profile-type";
import { PostType } from "../gql-types/post-type";
import { Profiles } from "./profiles";
import { MemberTypes } from "./member-types";
import { Users } from "./users";
import { Posts } from "./posts";


export class GraphqlController extends Controller {

  schema

  constructor(fastify: FastifyInstance) {
    super(fastify, true)

    const memberType: MemberTypeType = new MemberTypeType(this.db)
    const profileType: ProfileType = new ProfileType(this.db)
    const postType: PostType = new PostType(this.db)
    const userType: UserType = new UserType(this.db, postType, profileType, memberType)

    const profiles = new Profiles(fastify)
    const memberTypes = new MemberTypes(fastify)
    const users = new Users(fastify)
    const posts = new Posts(fastify)
    profiles
    users
    posts

    this.schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
          'memberTypes': {
            type: new GraphQLList(memberType),
            args: {},
            resolve: async () => await memberTypes.getMemberTypes()
          },
          'memberType': {
            type: memberType,
            args: { id: { type: GraphQLID } },
            resolve: async (source, args: { id: string }) =>
              await memberTypes.getMemberType(args.id)
          },
          'users': {
            description: 'users list',
            type: new GraphQLList(userType),
            args: {},
            resolve: async () => await users.getUsers()
          },
          'user': {
            type: userType,
            args: { id: { type: GraphQLID } },
            resolve: async (source, args: { id: string }) => await users.getUser(args.id)
          },
          'profiles': {
            description: 'profiles list',
            type: new GraphQLList(profileType),
            args: {},
            resolve: async () => await profiles.getProfiles()
          },
          'profile': {
            type: profileType,
            args: { id: { type: GraphQLID } },
            resolve: async (source, args: { id: string }) => await profiles.getProfile(args.id)
          },
          'posts': {
            description: 'posts list',
            type: new GraphQLList(postType),
            args: {},
            resolve: async () => await posts.getPosts()
          },
          'post': {
            type: postType,
            args: { id: { type: GraphQLID } },
            resolve: async (source, args: { id: string }) => await posts.getPost(args.id)
          }
        },
      }),
      mutation: new GraphQLObjectType({
        name: 'RootMutation',
        fields: {
          'createUser': {
            type: userType,
            args: {
              userData: { type: new GraphQLNonNull(UserInputCreateType) }
            },
            resolve: async (source, args, options) => await users.addUser(args.userData)
          },
          'updateUser': {
            type: userType,
            args: {
              id: { type: new GraphQLNonNull(GraphQLID) },
              userData: { type: new GraphQLNonNull(UserInputUpdateType) }
            },
            resolve: async (source, args, options) => await users.updateUser(args.id, args.userData)
          },
          'createProfile': {
            type: profileType,
            args: {
              profileData: { type: new GraphQLNonNull(ProfileInputCreateType) }
            },

            resolve: async (source, args, options) => await profiles.addProfile(args.profileData)
          },
          'updateProfile': {
            type: profileType,
            args: {
              id: { type: new GraphQLNonNull(GraphQLID) },
              profileData: { type: new GraphQLNonNull(ProfileInputUpdateType) }
            },
            resolve: async (source, args, options) => await profiles.updateProfile(args.id, args.profileData)
          },
        }
      })
    });
  }

  exec = async (mutation: any, query: any, variables: any) => {

    console.log('mutation')
    console.log(mutation)
    console.log('query')
    console.log(query)
    console.log('variables')
    console.log(variables)

    return await graphql({
      schema: this.schema,
      source: query,
      variableValues: variables,
    })
  }
}
