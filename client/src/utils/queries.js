import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            group {
                _id
                groupName
            }
        }
    }
`;

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            group {
                _id
                groupName
                users {
                    _id
                    username
                }
                chores {
                    _id
                    choreName
                    choreBody
                    createdAt
                    username
                    dueDate
                    status
                }
            }
        }
    }
`;
