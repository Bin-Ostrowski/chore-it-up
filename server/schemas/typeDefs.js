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
    }
`;

module.exports = typeDefs;
