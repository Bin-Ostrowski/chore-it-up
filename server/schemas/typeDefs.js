const { gql } = require('apollo-server-express');

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
    type Group {
        _id: ID
        groupName: String
        users: [User]
        chores: [Chore]
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        groups: [Group]
        chores: [Chore]
    }

    # type Query {
    # }

    type Mutation {
        addChore(choreName: String!, choreBody: String): Group
    }
`;

module.exports = typeDefs;
