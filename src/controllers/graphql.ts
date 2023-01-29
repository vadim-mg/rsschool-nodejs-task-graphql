import { Controller } from "./controller";
import { FastifyInstance } from "fastify";
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import { MemberTypeType } from "../gql-types/member-type-type";
import { UserType } from "../gql-types/user-type";
import { ProfileType } from "../gql-types/profile-type";
import { PostType } from "../gql-types/post-type";


export class GraphqlController extends Controller {

  schema

  constructor(fastify: FastifyInstance) {
    super(fastify)

    const memberType: any = new MemberTypeType(this.db)
    const profileType: any = new ProfileType(this.db)
    const postType: any = new PostType(this.db)
    const userType: any = new UserType(this.db, postType, profileType, memberType)

    this.schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
          memberTypes: {
            type: new GraphQLList(memberType),
            args: {},
            resolve: async () => {
              return await this.db.memberTypes.findMany()
            }
          },
          memberType: {
            type: memberType,
            args: { id: { type: GraphQLID } },
            resolve: async (source, args: { id: string }) => {
              return await this.db.memberTypes.findOne({ key: 'id', equals: args.id })
            }
          },
          users: {
            description: 'users list',
            type: new GraphQLList(userType),
            args: {},
            resolve: async () => {
              return await this.db.users.findMany()
            }
          },
          user: {
            type: userType,
            args: { id: { type: GraphQLID } },
            resolve: async (source, args: { id: string }) => {
              return await this.db.users.findOne({ key: 'id', equals: args.id })
            }
          },
          profiles: {
            description: 'profiles list',
            type: new GraphQLList(profileType),
            args: {},
            resolve: async () => {
              return await this.db.profiles.findMany()
            }
          },
          profile: {
            type: profileType,
            args: { id: { type: GraphQLID } },
            resolve: async (source, args: { id: string }) => {
              return await this.db.profiles.findOne({ key: 'id', equals: args.id })
            }
          },
          posts: {
            description: 'posts list',
            type: new GraphQLList(postType),
            args: {},
            resolve: async () => {
              return await this.db.posts.findMany()
            }
          },
          post: {
            type: postType,
            args: { id: { type: GraphQLID } },
            resolve: async (source, args: { id: string }) => {
              return await this.db.posts.findOne({ key: 'id', equals: args.id })
            }
          }
        },
      }),
    });
  }

  exec = async (mutation: any, query: any, variables: any) => {

    // console.log('mutation')
    // console.log(mutation)
    // console.log('query')
    // console.log(query)
    // console.log('variables')
    // console.log(variables)

    return await graphql({
      schema: this.schema,
      source: query,
      variableValues: variables
    })
  }
}
