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
    ) {
        addChore(
            group: $group
            userId: $userId
            choreName: $choreName
            choreBody: $choreBody
            dueDate: $dueDate
        ) {
            _id
            choreName
            choreBody
            createdAt
            dueDate
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
