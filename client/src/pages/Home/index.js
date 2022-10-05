import React from 'react';
// import GroupFrom from "../components/GroupFrom";
// import GroupList from "../components/GroupList";
import ChoreForm from '../../components/ChoreForm';

const Home = () => {
    // query requests

    // If logged in, Auth.LogginIn() will be true

    return (
        <main>
            <div>
                <h2>Group Form</h2>
                <h2>Group List</h2>
                <ChoreForm />
                {/* <ChoreList 
                pass chores={chores}
                groups={groups} /> */}
            </div>
        </main>
    );
};

export default Home;
