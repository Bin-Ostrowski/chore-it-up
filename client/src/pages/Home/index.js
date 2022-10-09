import { React, useState, useEffect } from 'react';
import GroupForm from '../../components/GroupForm';
// import GroupList from "../components/GroupList";
import ChoreForm from '../../components/ChoreForm';
import ChoreList from '../../components/ChoreList';
import MemberForm from '../../components/MemberForm';
import './home.css';

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { QUERY_ME } from '../../utils/queries';

const Home = () => {
    // query requests

    // If logged in, Auth.LogginIn() will be true

    const { loading, error, data } = useQuery(QUERY_ME);

    const [isGroup, setisGroup] = useState(false);

    if (!loading) {
        if (error) {
            console.log(error);
        }

        if (!data.me) {
            return <GroupForm />;
        }

        console.log(data.me);
        if (data.me.group) {
            const groupName = data.me.group.groupName;
            return (
                <main>
                    <h2>Group Form</h2>
                    {data.me.group && (
                        <div className="groups-display">
                            {/* //map over group id */}
                            <div className="group-container">
                                <h2>{groupName}</h2>
                                <MemberForm />
                                <ChoreForm />
                               . {/* <ChoreList chores={data.me.chores}/> */}
                            </div>
                        </div>
                    )}
                </main>
            );
        }
    }
    return <GroupForm />;
};

export default Home;
