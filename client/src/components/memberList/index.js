import React from 'react';
import { useQuery } from '@apollo/client';

import{List,ListItem, ListIcon, UnorderedList, Button } from '@chakra-ui/react'
// import{DeleteIcon}from'@chakra-ui/icons'
import { QUERY_GROUP } from '../../utils/queries';

import '../MemberForm/memberForm.css';

const MemeberList = ({ userData }) => {
    // Query group data
    const { loading, error, data } = useQuery(QUERY_GROUP, {
        variables: { groupName: userData.group.groupName },
    });
    const usersData = data?.group || {}

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
                         <Button size='xs' className='' onClick={''}>X</Button>
                       {/* <ListIcon as={DeleteIcon}  color='green.500' /> */}
                    </ListItem>
                ))}
            </UnorderedList>
        </div>
    );
};

export default MemeberList;
