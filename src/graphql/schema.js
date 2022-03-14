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
    createdAt: String
    updatedAt: String
  }

  input ContactInput {
    firstName: String!
    lastName: String
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
    city: String
    street: String
    country: String
    postalCode: String
  }

  input ContactUpdateInput {
    id: ID!
    firstName: String
    lastName: String
    email: EmailAddress
    phone: PhoneInput
    address: AddressInput
  }

  type Query {
    contacts: [Contact]
    contact(id: ID!): Contact
  }

  type Mutation {
    createContact(Contact: ContactInput!): Contact!
    updateContact(Contact: ContactUpdateInput!): Contact!
    deleteContact(id: ID!): Contact!
  }
`
