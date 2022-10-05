import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Chore {
        _id: ID
        choreName: String
        choreBody: String
        createdAt: String
        username: String
        assignedTo: String
        status: String
        dueDate: String
    }

    type Query {
        chore(_id: ID!): Chore
        chores(group: ID, groupName: String): [Chore]
    }
`;

module.exports = typeDefs;
