import { React, useState } from 'react';
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
    const [groups, setGroups] = useState([]);

    function handleChange(event) {
        setGroups([...event, event.target.value]);
    }

    function handleAddGroup() {
        console.log(groups);
    }
    return (
        <main>
            <h2>Group Form</h2>
            <div className="add-group-container">
                <FormControl className="add-group-form">
                    <Button
                        onClick={handleAddGroup}
                        colorScheme="green"
                        variant="solid"
                        size="lg"
                    >
                        Add new group!
                    </Button>
                    <div className="group-input">
                        <FormLabel>Group Name:</FormLabel>
                        <Input
                            name="groupName"
                            id="groupName"
                            onChange={handleChange}
                            className="group-input"
                            width="300px"
                            style={{ border: '1px solid black' }}
                        />
                    </div>
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
