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
    const loggedIn = auth.loggedIn();
    if (!loggedIn) {
        window.location.assign('/');
    }
    if (auth.isTokenExpired(auth.getToken())) {
        window.location.replace('/');
    }
    // query requests

    // If logged in, Auth.LogginIn() will be true

    const {
        loading,
        error,
        data,
        refetch: meQueryRefetch,
    } = useQuery(QUERY_ME);

    console.log(data);
    const groupName = data?.me?.group?.groupName;

    const {
        loading: groupLoading,
        error: groupError,
        data: groupData,
        refetch,
    } = useQuery(QUERY_GROUP, {
        variables: { groupName },
        skip: loading,
    });
    // refeches on page load so you can transition between home and youChores
    // if (!(groupLoading && loading)) {
    //     refetch();
    // }

    console.log('home groupData', groupData);

    const [isGroup, setisGroup] = useState(false);

    if (!(loading || groupLoading)) {
        if (error) {
            console.log(error);
        }
        console.log(data.me);
        if (!data.me.group) {
            return <GroupForm refetch={meQueryRefetch} />;
        }

        // console.log(data.me.group.groupName);
        if (data.me.group) {
            return (
                <main style={{ backgroundColor: '#284B63' }}>
                    {data.me.group && (
                        <div className="groups-display">
                            {/* //map over group id */}
                            <div className="group-container">
                                <p class="group-title">{groupName}</p>
                                <MemberForm
                                    groupData={groupData}
                                    refetch={refetch}
                                />
                                <MemberList
                                    groupData={groupData}
                                    // loading={groupLoading}
                                />
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
