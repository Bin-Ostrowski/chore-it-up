import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_USER_FROM_GROUP } from '../../utils/mutations';
import { QUERY_GROUP } from '../../utils/queries';
import { ListItem, UnorderedList, Button } from '@chakra-ui/react';

import '../MemberForm/memberForm.css';

const MemeberList = ({ userData }) => {
    // console.log('group-name', userData.group.groupName);
    console.log('group', userData.group);

    // declare state for removeUser variables. 
    // const [groupIdMembers, setGroupId] = useState(userData.group._id);
    // const [userId, setUserId] = useState('');

    //the declare REMOVE_CHORE mutation
    const [removeUserFromGroup, { removeError }] = useMutation(
        REMOVE_USER_FROM_GROUP
    );

    // Query group data
    const { loading, error, data } = useQuery(QUERY_GROUP, {
        variables: { groupName: userData.group.groupName },
    });
    // if data exists define usersData or return empty objecty
    // console.log('data', data);
    const usersData = data?.group || {};
    // use effect to refresh call when member is added to DB

    //     useEffect((data) => {
    //   return data
    //     });

    // remove member from group
    const handlerRemoveUser = async (removeUserId) => {
        const removeGroupId = userData.group._id
      
        // grap user's info - userId, groupId
        try {
            await removeUserFromGroup({
                variables: { userId: removeUserId, groupId: removeGroupId },
            });
            console.log('username removed');
        } catch (e) {
            console.log('failed')
            console.log(e);
        }
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
                {/* //map thought group members and return username*/}
                {usersData.users?.map((user, i) => (
                    

                    
                    
                    <ListItem key={user._id} className="username-list">
                        {user.username}
                        <Button size="xs" className="" 
                        onClick={() => handlerRemoveUser(user._id)}
                        >
                            X
                        </Button>
                        {/* <ListIcon as={DeleteIcon}  color='green.500' /> */}
                    </ListItem>
                ))}
            </UnorderedList>
        </div>
    );
};

export default MemeberList;
