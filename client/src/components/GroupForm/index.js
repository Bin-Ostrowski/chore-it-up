import { React, useState } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    ButtonGroup,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { ADD_GROUP } from '../../utils/mutations';
import Auth from '../../utils/auth';

import './home.css';

const GroupForm = () => {
    const [groupState, setGroups] = useState([
        {
            groupName: '',
            users: [],
        },
    ]);
    const [addGroup, { error }] = useMutation(ADD_GROUP);
    const [isError, setIsError] = useState();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setGroups({
            ...groupState,
            [name]: value,
        });
    };

    const handleGroupSubmit = async (event) => {
        event.preventDefault();

        if (!groupState.groupName) {
            setIsError(true);
        }
        if (!isError) {
            try {
                await addGroup({
                    variables: { ...groupState },
                });

                console.log(groupState);
            } catch (e) {
                console.error(e);
            }
        }
    };
    return (
        <div className="add-group-container">
            <FormControl className="add-group-form">
                <Button
                    onClick={handleGroupSubmit}
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
    );
};

export default GroupForm;
