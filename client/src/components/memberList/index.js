import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_GROUP } from '../../utils/queries';

import '../MemberForm/memberForm.css';

const MemeberList = ({ userData }) => {
    console.log(userData.group.groupName )
    const { loading, error, data } = useQuery(QUERY_GROUP, {
        variables: { groupName: userData.group.groupName },
    });


    console.log('groupData', data);
    console.log('username', data.group.users[0].username)

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
                {/* //map thought group members */}
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