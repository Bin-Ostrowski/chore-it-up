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
        return <h2>You don't currently have any chores! Nice Job!</h2>;
    }
    // loading variable used to briefly show a loading <div> element
    return (
        <div className="your-chores-container">
            <div className="title-container">
                <h2 className="title">UserName's Chores</h2>
            </div>
            <div className="list-container">
                <ChoreList
                    choresData={yourChores}
                    loading={loadingMe}
                    refetch={refetch}
                    data={dataMe.me}
                    // pass groups={groups}
                    // chores={chores}
                />
            </div>
        </div>
    );
};

export default YourChores;
