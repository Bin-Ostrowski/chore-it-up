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

// will need to fix - username is null when queried
export const ADD_USER_TO_GROUP = gql`
    mutation addUserToGroup($userId: ID!, $groupId: ID!) {
        addUserToGroup(userId: $userId, groupId: $groupId) {
            _id
            groupName
        }
    }
`;
