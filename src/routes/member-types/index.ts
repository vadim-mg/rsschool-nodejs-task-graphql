import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { changeMemberTypeBodySchema } from './schema';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import { MemberTypes } from '../../controllers/member-types';


const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {

  const memberTypes = new MemberTypes(fastify.db.memberTypes, fastify.httpErrors)

  fastify.get('/', async function (request, reply): Promise<
    MemberTypeEntity[]
  > {
    return await memberTypes.getMemberTypes()
  });


  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity> {
      return await memberTypes.getMemberType(request.params.id)
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeMemberTypeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity> {
      return await memberTypes.updateMemberType(request.params.id, request.body)
    }
  );
};

export default plugin;
