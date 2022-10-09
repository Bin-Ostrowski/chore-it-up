const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Chore {
        _id: ID
        choreName: String
        choreBody: String
        createdAt: String
        username: String
        assignedTo: User
        status: String
        dueDate: String
        group: Group
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
        group: Group
        chores: [Chore]
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        groups: [Group]
        group(groupName: String!): Group
        chores: [Chore]
        chore(choreName: String!): Chore
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addGroup(groupName: String!): Group
        removeGroup(_id: ID): Group
        addUserToGroup(userId: ID!, groupId: ID!): Group
        removeUserToGroup(username: String!): Group
        addChore(
            group: ID!
            userId: ID!
            choreName: String!
            choreBody: String
            dueDate: String
            assignedTo: String
        ): Chore
        removeUserFromGroup(userId: ID!, groupId: ID!): Group
        removeChore(choreId: ID!, groupId: ID!): Chore
        updateChore(
            choreId: ID!
            choreName: String
            choreBody: String
            dueDate: String
        ): Chore
    }
`;

module.exports = typeDefs;
