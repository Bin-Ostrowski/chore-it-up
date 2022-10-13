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

    // query to get all the chores
    const { loading, error, data, refetch } = useQuery(QUERY_CHORES);
    // meQuery for getting the logged in user's username
    const {
        loading: loadingMe,
        error: errorMe,
        data: dataMe,
    } = useQuery(QUERY_ME, {
        // allows QUERY_CHORES  to finish before running QUERY_ME
        skip: loading,
    });

    // refreshes chore data so newly added chores from the homepage will show up
    refetch();

    const yourChores = [];
    // maps over all the chores and only sends the user's chores to the youChores array
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

    return (
        <main
            className="your-chores-container"
            style={{ backgroundColor: '#284B63' }}
        >
            <div className="list-container">
                <h2 className="title">{dataMe.me.username}'s chores</h2>

                <ChoreList
                    // sends only the users chores to the ChoreList component
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
