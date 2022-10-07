import React from 'react';
// import GroupFrom from "../components/GroupFrom";
// import GroupList from "../components/GroupList";
import ChoreForm from '../../components/ChoreForm';
import ChoreList from '../../components/ChoreList';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    ButtonGroup,
} from '@chakra-ui/react';

import './home.css';

const Home = () => {
    // query requests

    // If logged in, Auth.LogginIn() will be true

    return (
        <main>
            <h2>Group Form</h2>
            <div className="add-group-container">
                <FormControl className="add-group-form">
                    <Button colorScheme="green" variant="solid" size="lg">
                        Add new group!
                    </Button>
                    <FormLabel>Group Name:</FormLabel>
                    <Input
                        className="group-input"
                        width="200px"
                        style={{ border: '1px solid black' }}
                    />
                </FormControl>
            </div>
            <div className="groups-display">
                {/* //map over group id */}
                <div className="group-container">
                    <h2>Group One</h2>
                    <ChoreForm />
                    <ChoreList />
                    {/* pass chores={chores}
                groups={groups} /> */}
                </div>
                <div className="group-container">
                    <h2>Group Two</h2>
                    <ChoreForm />
                    <ChoreList />
                    {/* pass chores={chores}
                groups={groups} /> */}
                </div>
            </div>
        </main>
    );
};

export default Home;
