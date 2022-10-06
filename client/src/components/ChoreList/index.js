import React from 'react';
import UpdateChoreModal from '../UpdateChoreModal';
import './choreList.css';

// do we ant to link the group to view SingleGroup page?
// import { Link } from "react-router-dom";

// pass in props for chores array, group array for that user
// pass chores so can pass to modal
const ChoreList = () => {
    // conditionaly render chores

    // remove Chore
    const removeChore = (chore) => {
        console.log('chore removed');
        // add mutation to updatechore to running tally.
    };

    // else return map of list of chores
    return (
        <ul>
            {/* // map thought chores */}
            <li className="list">
                <div className="list-text">
                    <div>Take Out The Trash dueDate</div>
                    <div>
                        Place at end of the driveway every wednesday night
                    </div>
                </div>
                <div className="list-btns">
                    {/* pass in chores to modal to render in fields */}
                    <UpdateChoreModal />

                    <button className="btn" onClick={removeChore}>
                        finish chore
                    </button>
                    <button className="btn">add to google calendar</button>
                </div>
            </li>
            <li className="list">
                <div className="list-text">
                    <div>Take Out The Trash dueDate</div>
                    <div>
                        Place at end of the driveway every wednesday night
                    </div>
                </div>
                <div className="list-btns">
                    <button className="btn">update chore</button>
                    <button className="btn">finish chore</button>
                    <button className="btn">add to google calendar</button>
                </div>
            </li>
        </ul>
    );
};

export default ChoreList;
