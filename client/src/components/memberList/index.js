import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_GROUP } from '../../utils/queries';

import '../MemberForm/memberForm.css';

const MemeberList = ({ userData }) => {
    // Query group data
    const { loading, error, data } = useQuery(QUERY_GROUP, {
        variables: { groupName: userData.group.groupName },
    });

    if (loading) {
        return <h3>LOADING...</h3>;
    }
    if (error) {
        console.error(error);
    }
    return (
        <div className="members">
            <h2>Group Members:</h2>
            <ul>
                {/* //map thought group members and return username*/}
                {data.group.users.map((user, i) => (
                    <li key={user._id} className="username-list">
                        <div> {user.username}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MemeberList;
