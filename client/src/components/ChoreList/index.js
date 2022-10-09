import React from 'react';
import UpdateChoreModal from '../UpdateChoreModal';
import ChoreForm from '../ChoreForm';
import './choreList.css';

// do we ant to link the group to view SingleGroup page?
// import { Link } from "react-router-dom";

// pass in props for chores array, group array for that user
// pass chores so can pass to modal
const ChoreList = ({ chores }) => {
    console.log('choreList', chores);

    // remove Chore
    const removeChore = (chore) => {
        console.log('chore removed', chore);
        // add mutation to updatechore to running tally.
    };

    // conditionaly render chores
    if (chores.length) {
        // if no choes return this:
        return <h3>No Chores Yet</h3>;
    }

    // else return map of list of chores
    return (
        <ul>
            {chores &&
                chores.map((chore) => {
                    <li className="list">
                        <div key={chore._id} className="list-text">
                            <div>
                                Chore Name: {chore.choreName} Finish By:{' '}
                                {chore.dueDate} Assinged To: {chore.assignedTo}
                            </div>
                            <div>Chore Description: {chore.choreBody}</div>
                        </div>
                        <div className="list-btns">
                            {/* pass in chores to modal to render in fields */}
                            <UpdateChoreModal chore={chore} />

                            <button className="btn" onClick={removeChore}>
                                finish chore
                            </button>
                            <button className="btn">
                                add to google calendar
                            </button>
                        </div>
                    </li>;
                })}
        </ul>
    );
};

export default ChoreList;
