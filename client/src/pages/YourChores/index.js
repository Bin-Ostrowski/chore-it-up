import React from 'react';
import ChoreList from '../../components/ChoreList';
import auth from '../../utils/auth';

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

    // loading variable used to briefly show a loading <div> element
    return (
        <div className="your-chores-container">
            <div className="title-container">
                <h2 className="title">UserName's Chores</h2>
            </div>
            <div className="list-container">
                <ChoreList
                // pass groups={groups}
                // chores={chores}
                />
            </div>
        </div>
    );
};

export default YourChores;
