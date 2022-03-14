import { makeExecutableSchema } from "@graphql-tools/schema"
import { PrismaClient } from "@prisma/client"
import { ApolloServer } from "apollo-server"
import { resolvers } from "./graphql/resolvers"
import { typeDefs } from "./graphql/schema"

const prisma = new PrismaClient({
  log: ["error"],
})

const context = {
  prisma,
}

let schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: [resolvers],
})

const server = new ApolloServer({
    schema: schema,
    context: context,
})

server.listen({ port }, () =>
  console.log(`Server runs at: http://localhost:${port}`)
)
