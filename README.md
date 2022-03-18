# node-graphql-phonebook
The application is built with node, express, express-graphql, prisma, postgres and auth0
The application performs CRUD operations on graphql api

## Environment variables
    - `DATABASE_URL` : db url for postgres
    - `AUTH0_DOMAIN` : auth0 domain for authentication
    - `AUDIENCE`     : auth0 audience url 

Please follow this url to setup the auth0 API - https://auth0.com/docs/quickstart/backend/nodejs/01-authorization

## Run Docker Compose for Postgres
Please install docker-compose before running the command

`docker-compose up -d`

## Run the migrations
Please run migrations with prisma to create the postgres tables 

`npx primsa migrate dev`

To learn more about Prisma and migrations - https://www.prisma.io/docs/concepts/components/prisma-migrate

## Install dependencies
`yarn install`

## Run server locally
`yarn run start:dev`

Default port is 4000, but you can set any open port
The api endpoint should run at http://localhost:4000/graphql
The graphql playground is at http://localhost:4000/playground

## Build
`yarn run build`

## Run the built files
`yarn start`

## Run the tests
`yarn run test`

### Notes
1. If time was given I would do below improvements -
    - If given more time, I would be interested in adding more validations to the api, there could be some errors, such as deleting a contact by id where id does not exist
    - So to validate above point, need more coverage of unit testing the application
    - Introduce more details to the Contact field, make it more user friendly by adding bulk creation - insertMany, updateMany, deleteMany capabilities
    - Scaling the application with a cloud hosted database

2. I choose the tech stack for following reasons -
    - Graphql is perfect for the api operations as it helps in solving n+1 database problem by not over fetching the data
    - Frontend application or any other services using the api could could save api calls
    - Postgres with prisma is super helpful for querying and also handling n+1 problem
    - One of the widely used tech stacks
