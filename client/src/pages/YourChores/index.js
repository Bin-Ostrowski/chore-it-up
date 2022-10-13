import React from 'react';
import { useQuery } from '@apollo/client';
import ChoreList from '../../components/ChoreList';
import auth from '../../utils/auth';
import { QUERY_CHORES, QUERY_ME } from '../../utils/queries';
import './youChores.css';

const YourChores = () => {
    const loggedIn = auth.loggedIn();
    if (!loggedIn) {
        window.location.assign('/');
    }
    if (auth.isTokenExpired(auth.getToken())) {
        window.location.replace('/');
    }

    // deconstruct variables loading and data from userQuery Hook for Query_me?
    const { loading, error, data, refetch } = useQuery(QUERY_CHORES);
    const {
        loading: loadingMe,
        error: errorMe,
        data: dataMe,
    } = useQuery(QUERY_ME, {
        skip: loading,
    });
    refetch();
    if (!loadingMe) {
    }

    const yourChores = [];

    if (!(loading || loadingMe)) {
        data?.chores?.map((chore) => {
            if (chore.assignedTo === dataMe.me.username) {
                yourChores.push(chore);
            }
        });
    }

    if (!yourChores.length) {
        return (
            <main
                className="your-chores-container"
                style={{ backgroundColor: '#284B63' }}
            >
                <div className="list-container">
                    <h2 className="title">
                        Your chores are complete! Nice Job!
                    </h2>
                </div>
            </main>
        );
    }
    // loading variable used to briefly show a loading <div> element
    return (
        <main
            className="your-chores-container"
            style={{ backgroundColor: '#284B63' }}
        >
            <div className="list-container">
                <h2 className="title">{dataMe.me.username}'s chores</h2>

                <ChoreList
                    choresData={yourChores}
                    loading={loadingMe}
                    refetch={refetch}
                    data={dataMe.me}
                />
            </div>
        </main>
    );
};

export default YourChores;
