import "dotenv/config"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { PrismaClient } from "@prisma/client"
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
import express from "express"
import { graphqlHTTP } from "express-graphql"
import expressPlayground from "graphql-playground-middleware-express"
import cors from "cors"

const app = express()

const port = process.env.PORT || 4000

const prisma = new PrismaClient({
  log: ["error"],
})

const context = async (headers) => {
  let ctx = { prisma }
  headers = await headers
  if (headers.hasOwnProperty("authorization")) {
    const { authorization: token } = headers
    ctx.token = token
    return ctx
  }
  return ctx
}

let schema = makeExecutableSchema({
  typeDefs: [scalarTypeDefs, typeDefs, constraintDirectiveTypeDefs],
  resolvers: [scalarResolvers, resolvers],
})
schema = constraintDirective()(schema)

app.use(
  "/graphql",
  cors(),
  graphqlHTTP(async (req) => ({
    schema,
    rootValue: resolvers,
    graphiql: true,
    context: context(req.headers),
  }))
)
app.get("/playground", expressPlayground({ endpoint: "/graphql" }))
app.listen(port)

console.log(`Server runs at: http://localhost:${port}`)
console.log(`Serve to Graphql playground at: http://localhost:${port}/playground`)
