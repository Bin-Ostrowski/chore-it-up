import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import UpdateChoreModal from '../UpdateChoreModal';
import ChoreForm from '../ChoreForm';
import './choreList.css';
import { QUERY_GROUP } from '../../utils/queries';

// do we ant to link the group to view SingleGroup page?
// import { Link } from "react-router-dom";

// pass in props for chores array, group array for that user
// pass chores so can pass to modal

const ChoreList = ({ choresData, loading, data }) => {
    // if data define chore data or empty object
    // const choresData = data?.group || {};
    console.log('chores data', choresData);
    console.log(data);

    // remove Chore
    // const removeChore = (chore) => {
    //     console.log('chore removed', chore);
    //     // add mutation to updatechore to running tally.
    // };

    // conditionaly render chores

    if (loading) {
        return <h1>loading...</h1>;
    } else if (!choresData.length) {
        // if no choes return this:
        console.log('no chores yet');
        return <h3>No Chores Yet</h3>;
    } else {
        console.log(choresData);
        return (
            <ul>
                {choresData.map((chore, i) => (
                    <li key={chore._id} className="list">
                        <div className="list-text">
                            <div>
                                Chore Name: {chore.choreName} Finish By:{' '}
                                {chore.dueDate}
                                {/* Assinged To:{' '} */}
                                {/* {chore.assignedTo} */}
                            </div>
                            <div>Chore Description: {chore.choreBody}</div>
                        </div>
                        <div className="list-btns">
                            {/* pass in chores to modal to render in fields */}
                            {/* <UpdateChoreModal chore={chore} /> */}

                            {/* <button className="btn" onClick={removeChore}>
                                        finish chore
                                    </button> */}
                            <button className="btn">
                                add to google calendar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    // else return map of list of chores
};

export default ChoreList;
