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

import './groupForm.css';

const GroupForm = ({ refetch }) => {
    const [groupInput, setGroupInput] = useState();
    const [groupState, setGroups] = useState([
        {
            groupName: '',
            users: [],
        },
    ]);

    const [addGroup, { error }] = useMutation(ADD_GROUP);
    const [isError, setIsError] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setGroups({
            ...groupState,
            [name]: value,
        });
    };

    const handleGroupSubmit = async (event) => {
        console.log(isError);
        if (!groupState.groupName) {
            setIsError(true);
        }
        if (!isError) {
            try {
                await addGroup({
                    variables: { ...groupState },
                });

                setGroupInput('');

                console.log(groupState);
            } catch (e) {
                console.error(e);
            }
        }
        refetch();
    };
    return (
        <div id="form-helper-container">
            <form className="add-group-container">
                <FormControl
                    isInvalid={isError}
                    isRequired
                    className="add-group-form"
                >
                    <Button
                        onClick={handleGroupSubmit}
                        id="add-group-btn"
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
                            value={groupInput}
                            onChange={handleChange}
                            className="group-input"
                            placeholder="admins only"
                        />
                        <FormErrorMessage
                            style={{
                                paddingLeft: '15px',
                                fontSize: '20px',
                                marginTop: '0',
                            }}
                        >
                            Group name required!
                        </FormErrorMessage>
                    </div>
                </FormControl>
            </form>

            <div id="helper-container">
                <ol id="helper-text">
                    <h1>Directions:</h1>
                    <li>Have all of your group members create an account.</li>
                    <li>
                        Once a few of the members have accounts created have ONE
                        member create the group. They are then the group Admin
                    </li>
                    <li>
                        After the group has been created the admin can then add
                        group members by their usernames.
                    </li>
                    <li>
                        Once a member has been added, next time they login they
                        will automatically see the group loaded to their page.
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default GroupForm;
