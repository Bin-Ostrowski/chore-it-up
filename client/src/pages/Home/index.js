import { React, useState, useEffect } from 'react';
import GroupForm from '../../components/GroupForm';
// import GroupList from "../components/GroupList";
import ChoreForm from '../../components/ChoreForm';
import ChoreList from '../../components/ChoreList';
import MemberForm from '../../components/MemberForm';
import MemberList from '../../components/memberList';
import './home.css';

import { useMutation, useQuery } from '@apollo/client';
// import { QUERY_USER } from '../../utils/queries';
import { QUERY_ME, QUERY_GROUP } from '../../utils/queries';
import auth from '../../utils/auth';

const Home = () => {
    // prevents a user from bypassing the login screen
    const loggedIn = auth.loggedIn();
    if (!loggedIn) {
        window.location.assign('/');
    }
    // sends the user back to the login screen if their token has expired
    if (auth.isTokenExpired(auth.getToken())) {
        window.location.replace('/');
    }

    const {
        loading,
        error,
        data,
        refetch: meQueryRefetch,
    } = useQuery(QUERY_ME);

    // gets the user's groupName from the QUERY_ME data
    const groupName = data?.me?.group?.groupName;

    // uses the users groupName to run a QUERY_GROUP
    const {
        loading: groupLoading,
        error: groupError,
        data: groupData,
        refetch,
    } = useQuery(QUERY_GROUP, {
        variables: { groupName },
        // tells this query to wait on QUERY_ME
        skip: loading,
    });

    if (!(loading || groupLoading)) {
        if (error) {
            console.log(error);
        }
        // if the user doesn't have a group render the groupForm
        if (!data.me.group) {
            return <GroupForm refetch={meQueryRefetch} />;
        }
        // render the member components and chore components only when the user belongs to a group
        if (data.me.group) {
            return (
                <main style={{ backgroundColor: '#284B63' }}>
                    {data.me.group && (
                        <div className="groups-display">
                            <div className="group-container">
                                <p className="group-title">{groupName}</p>
                                <MemberForm
                                    groupData={groupData}
                                    refetch={refetch}
                                />
                                <MemberList groupData={groupData} />
                                <ChoreForm
                                    groupData={groupData}
                                    refetch={refetch}
                                />
                                <ChoreList
                                    choresData={groupData.group.chores}
                                    loading={groupLoading}
                                    data={groupData}
                                    refetch={refetch}
                                />
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
