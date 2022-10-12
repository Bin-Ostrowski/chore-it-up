import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                group {
                    _id
                    groupName
                }
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_GROUP = gql`
    mutation addGroup($groupName: String!) {
        addGroup(groupName: $groupName) {
            _id
            groupName
        }
    }
`;

export const ADD_CHORE = gql`
    mutation addChore(
        $group: ID!
        $userId: ID!
        $choreName: String!
        $choreBody: String
        $dueDate: String
        $assignedTo: String!
    ) {
        addChore(
            group: $group
            userId: $userId
            choreName: $choreName
            choreBody: $choreBody
            dueDate: $dueDate
            assignedTo: $assignedTo
        ) {
            _id
            choreName
            choreBody
            createdAt
            dueDate
            assignedTo
        }
    }
`;

export const REMOVE_CHORE = gql`
    mutation removeChore($choreId: ID!, $groupId: ID!) {
        removeChore(choreId: $choreId, groupId: $groupId) {
            _id
        }
    }
`;

export const ADD_USER_TO_GROUP = gql`
    mutation addUserToGroup($userId: ID!, $groupId: ID!) {
        addUserToGroup(userId: $userId, groupId: $groupId) {
            _id
            groupName
        }
    }
`;

export const REMOVE_USER_FROM_GROUP = gql`
    mutation removeUserFromGroup($userId: ID!, $groupId: ID!) {
        removeUserFromGroup(userId: $userId, groupId: $groupId) {
            _id
        }
    }
`;

export const UPDATE_CHORE = gql`
    mutation updateChore(
        $choreId: ID!
        $choreName: String
        $choreBody: String
        $dueDate: String
        $assignedTo: String
    ) {
        updateChore(
            choreId: $choreId
            choreName: $choreName
            choreBody: $choreBody
            dueDate: $dueDate
            assignedTo: $assignedTo
        ) {
            _id
            choreName
            choreBody
            createdAt
            assignedTo
            dueDate
        }
    }
`;
