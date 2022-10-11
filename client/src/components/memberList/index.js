import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_USER_FROM_GROUP } from '../../utils/mutations';
import { QUERY_GROUP } from '../../utils/queries';
import { ListItem, UnorderedList, Button } from '@chakra-ui/react';

import '../MemberForm/memberForm.css';

const MemeberList = ({ userData }) => {
    //the declare REMOVE_CHORE mutation
    const [removeUserFromGroup, { removeError }] = useMutation(
        REMOVE_USER_FROM_GROUP
    );

    // add cache to update page

    // Query group data
    const { loading, error, data, refetch } = useQuery(QUERY_GROUP, {
        variables: { groupName: userData.group.groupName },
    });
    // if data exists define usersData or return empty objecty
    const usersData = data?.group || {};

    // remove member from group
    const handlerRemoveUser = async (removeUserId) => {
        const removeGroupId = userData.group._id;

        try {
            await removeUserFromGroup({
                variables: { userId: removeUserId, groupId: removeGroupId },
            });
        } catch (e) {
            console.log(e);
        }

        // refresh query
        refetch({data})
    };

    if (loading) {
        return <h3>LOADING...</h3>;
    }
    if (error) {
        console.error(error);
    }
    return (
        <div className="members">
            <h2>Group Members:</h2>
            <UnorderedList>
                {/* //map throught group members and return username*/}
                {usersData.users?.map((user, i) => (
                    <ListItem key={user._id} className="username-list">
                        {user.username}
                        <Button
                            size="xs"
                            className=""
                            onClick={() => handlerRemoveUser(user._id)}
                        >
                            X
                        </Button>
                    </ListItem>
                ))}
            </UnorderedList>
        </div>
    );
};

export default MemeberList;
