const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Comp {
  id: Int
  mark: String
  model: String
  year: String
}
input CompInput {
  mark: String!
  model: String!
  year: String!
}
input UpdateCompInput {
  mark: String!
  model: String!
  year: String!
}
type RootQuery {
  getComps: [Comp!]!
}
type RootMutation {
  createComp(compInput: CompInput): Comp
  updateComp(id: ID!, mark: String, model: String, year: String): Comp
  deleteComp(id: ID!): Comp
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
