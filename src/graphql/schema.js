import { gql } from "apollo-server"

export const typeDefs = gql`
  type Phone {
    work: String
    home: String
    mobile: String
    other: String
  }

  type Address {
    city: String
    street: String
    postalCode: String
    country: String
  }

  type Contact {
    id: ID!
    firstName: String!
    lastName: String
    email: String
    phone: Phone
    address: Address
    createdAt: DateTime
    updatedAt: DateTime
  }

  input ContactInput {
    firstName: String!
      @constraint(pattern: "^([ 0-9À-ǿa-zA-Z'-])+$", maxLength: 255)
    lastName: String
      @constraint(pattern: "^([ 0-9À-ǿa-zA-Z'-])+$", maxLength: 255)
    email: String
    phone: PhoneInput
    address: AddressInput
  }

  input PhoneInput {
    work: String
    home: String
    mobile: String
    other: String
  }

  input AddressInput {
    city: String @constraint(pattern: "^([ À-ǿa-zA-Z'-])+$", maxLength: 255)
    street: String @constraint(pattern: "^([ À-ǿa-zA-Z'-])+$", maxLength: 255)
    country: String @constraint(pattern: "^([ À-ǿa-zA-Z'-])+$", maxLength: 56)
    postalCode: String @constraint(pattern: "^([ 0-9-])+$", maxLength: 10)
  }

  input ContactUpdateInput {
    id: ID!
    firstName: String
    lastName: String
    email: EmailAddress
    phone: PhoneInput
    address: AddressInput
  }

  enum Sort {
    asc
    desc
  }

  input ContactOrderByInput {
    firstName: Sort
    createdAt: Sort
    updatedAt: Sort
  }

  type Query {
    contacts(skip: Int, take: Int, orderBy: ContactOrderByInput): [Contact]
    contact(id: ID!): Contact
  }

  type Mutation {
    createContact(Contact: ContactInput!): Contact!
    updateContact(Contact: ContactUpdateInput!): Contact!
    deleteContact(id: ID!): Contact!
  }
`
