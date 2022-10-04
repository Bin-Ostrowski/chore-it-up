import React from 'react';

// do we ant to link the group to view SingleGroup page?
// import { Link } from "react-router-dom";

// pass in props for chores array, group array for that user
const ChoreList = () => {
    // conditionaly render chores

    // else return map of list of thoughts
    return (
        <div>
            {/* // map thought chores */}

            <div>choreName dueDate</div>
            <div>choreBody</div>
            <button>update chore</button>
            <button>finish chore</button>
            <button>add to google calendar</button>
        </div>
    );
};

export default ChoreList;
