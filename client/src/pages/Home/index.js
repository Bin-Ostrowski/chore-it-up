import React from 'react';
// import GroupFrom from "../components/GroupFrom";
// import GroupList from "../components/GroupList";
import ChoreForm from '../../components/ChoreForm';
// import ChoreList from '../../components/ChoreList';
import './home.css';

const Home = () => {
    // query requests

    // If logged in, Auth.LogginIn() will be true

    return (
        <main>
            <h2>Group Form</h2>
            <div className="groups-display">
                {/* //map over group id */}
                <div className="group-container">
                    <h2>Group One</h2>
                    <ChoreForm />
                    
                </div>
                <div className="group-container">
                    <h2>Group Two</h2>
                    <ChoreForm />
                    {/* <ChoreList />
                    {/* pass chores={chores}
                groups={groups} /> */}
                </div>
            </div>
        </main>
    );
};

export default Home;
