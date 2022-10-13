import React from 'react';
import { useQuery } from '@apollo/client';
import ChoreList from '../../components/ChoreList';
import auth from '../../utils/auth';
import { QUERY_CHORES, QUERY_ME } from '../../utils/queries';
import './youChores.css';
// import ChoreForm from '../components/ChoreForm';

// import Auth from "../utils/auth";

// useParams to gram parameter from URL?

// import query

const YourChores = () => {
    const loggedIn = auth.loggedIn();
    if (!loggedIn) {
        window.location.assign('/');
    }
    if (auth.isTokenExpired(auth.getToken())) {
        window.location.replace('/');
    }
    // grab id from params
    // define and deconstruct userID

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
        console.log(dataMe);
    }

    console.log('data me', dataMe);

    const yourChores = [];
    // console.log(data.chores);
    if (!(loading || loadingMe)) {
        data?.chores?.map((chore) => {
            console.log('assignTo', chore.assignedTo);
            console.log('username', dataMe.me.username);
            if (chore.assignedTo === dataMe.me.username) {
                yourChores.push(chore);
            }
        });
        console.log('yourChores', yourChores);
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
                    // pass groups={groups}
                    // chores={chores}
                />
            </div>
        </main>
    );
};

export default YourChores;
