import "dotenv/config"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { PrismaClient } from "@prisma/client"
import { ApolloServer } from "apollo-server"
import { resolvers } from "./graphql/resolvers"
import { typeDefs } from "./graphql/schema"
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from "graphql-scalars"
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from "graphql-constraint-directive"

const port = process.env.PORT || 4000

const prisma = new PrismaClient({
  log: ["error"],
})

const context = {
  prisma,
}

let schema = makeExecutableSchema({
  typeDefs: [scalarTypeDefs, typeDefs, constraintDirectiveTypeDefs],
  resolvers: [scalarResolvers, resolvers],
})
schema = constraintDirective()(schema)

const server = new ApolloServer({
    schema: schema,
    context: context,
})

server.listen({ port }, () =>
  console.log(`Server runs at: http://localhost:${port}`)
)
