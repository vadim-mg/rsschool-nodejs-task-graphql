import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { GraphqlController } from '../../controllers/graphql';
import { graphqlBodySchema } from './schema';


const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {

  const graphqlController = new GraphqlController(fastify)


  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async function (request, reply) {
      const { mutation, query, variables } = request.body
      return await graphqlController.exec(mutation, query, variables)
    }
  );
};

export default plugin;
