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

export const QUERY_USERS = gql`
    query Users {
        users {
            _id
            username
            group {
                _id
                groupName
                users {
                    _id
                    username
                }
            }
            chores {
                _id
                choreName
                choreBody
                createdAt
                username
                assignedTo
                dueDate
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
            }
            chores {
                _id
                choreName
                choreBody
                createdAt
                username
                dueDate
                assignedTo
                status
            }
        }
    }
`;

export const QUERY_GROUP = gql`
    query group($groupName: String!) {
        group(groupName: $groupName) {
            _id
            groupName
            chores {
                _id
                choreName
                choreBody
                dueDate
                assignedTo
            }
            users {
                _id
                username
            }
        }
    }
`;

export const QUERY_CHORES = gql`
query chores {
  chores {
    _id
    choreName
    choreBody
    createdAt
    username
    assignedTo
    dueDate
  }
}
`;