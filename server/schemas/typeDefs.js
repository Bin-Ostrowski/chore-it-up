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

    type Query {
        me: User
        users: [User]
        user(username: String!): Thought
        groups(groupName: String!): [Group]
        group(_id: ID!): Group
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addGroup(groupName: String!): Group
        removeGroup(_id: ID): Group
    }
`;

module.exports = typeDefs;
