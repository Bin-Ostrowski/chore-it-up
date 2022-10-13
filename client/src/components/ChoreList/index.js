import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import UpdateChoreModal from '../UpdateChoreModal';
import './choreList.css';
import { REMOVE_CHORE } from '../../utils/mutations';
import dateFormat from '../../utils/dateFormat';

// pass in props for chores array for that group
const ChoreList = ({ choresData, loading, data, refetch }) => {
    console.log('chores data', choresData);
    console.log('data', data);

    // declare REMOVE_CHORE mutation
    const [removeChore, { error }] = useMutation(REMOVE_CHORE);

    // remove Chore
    const handleRemoveChore = async (removeChoreId) => {
        try {
            await removeChore({
                variables: { choreId: removeChoreId, groupId: data.group._id },
            });
            // refetch group query to update chorelist
            refetch();
        } catch (e) {
            console.error(e);
        }

        // add mutation to updatechore to running tally.
        refetch();
    };

    // conditionaly render chores
    if (loading) {
        return <h1>loading...</h1>;
    } else if (!choresData?.length) {
        // if no choes return this:
        console.log('no chores yet');
        return <p className="chore-placeholder">No Chores Yet</p>;
    } else {
        console.log(choresData);
        return (
            <ul>
                {choresData.map((chore, i) => (
                    <li key={chore._id} className="list">
                        <div className="list-title">
                            <div className="title-to-right">CHORE: </div>
                            <div className="title-to-right">FINISH BY: </div>
                            <div className="title-to-right">ASSIGNED: </div>{' '}
                            <div className="title-to-right">DESCRIPTION: </div>
                        </div>

                        <div className="list-input">
                            <div>{chore.choreName}</div>
                            <div>{dateFormat(chore.dueDate)}</div>
                            <div>{chore.assignedTo}</div>
                            <div>{chore.choreBody}</div>
                        </div>
                        <div className="list-btns">
                            {/* pass in chores to modal to render in fields */}
                            <UpdateChoreModal
                                chore={chore}
                                groupData={data}
                                refetch={refetch}
                            />
                            <button
                                className="btn"
                                onClick={() => handleRemoveChore(chore._id)}
                            >
                                Chore Completed
                            </button>
                            {/* <button className="btn">
                                Add to Google Calendar
                            </button> */}
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    // else return map of list of chores
};

export default ChoreList;
