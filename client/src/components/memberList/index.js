import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USER_TO_GROUP } from '../../utils/mutations';
import { QUERY_USERS, QUERY_GROUP } from '../../utils/queries';

import './memberForm.css';

const MemeberList = ({ userData }) => {
    // const { groupLoading, e, groupData } = useQuery(QUERY_GROUP, {
    //     variables: { groupName: userData.group.groupName },
    //     skip: data,
    // });

    // console.log(e)
    // console.log('groupData', groupData);

    return (
        <div className="members">
            <h2>Group Members:</h2>
            <ul>
                {/* //map thought group members */}
                {groupData.users.map((user) => (
                    <li key={user._id} className="username-list">
                        <div> {userData.group.users.username}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
