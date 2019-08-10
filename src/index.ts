import { nexusPrismaPlugin } from '@generated/nexus-prisma'
import Photon from '@generated/photon'
import { idArg, makeSchema, objectType, stringArg } from '@prisma/nexus'
import { GraphQLServer } from 'graphql-yoga'
import { join } from 'path'
import { Context } from './types'
import { resolvers } from './resolvers'

const photon = new Photon()

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
})

const schema = makeSchema({
  types: [nexusPrisma],
  outputs: {
    typegen: join(__dirname, '../generated/nexus-typegen.ts'),
    schema: join(__dirname, '/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
      {
        source: join(__dirname, 'types.ts'),
        alias: 'ctx',
      },
    ],
  },
})

const server = new GraphQLServer({
  schema,
  resolvers,
  context: { photon },
})

server.start(() => console.log(`🚀 Server ready at http://localhost:4000`))
