import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CHORE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Button,
} from '@chakra-ui/react';

import './choreForm.css';

const ChoreForm = ({ refetch, groupData }) => {
    // declare query_ME
    const { loading, data } = useQuery(QUERY_ME);

    // set user and group id's
    const groupId = data.me.group._id;
    const userId = data.me._id;

    // set State for inputs
    const [choreData, setChoreData] = useState({});

    // Set error State
    const [isError, setIsError] = useState(false);

    // error message state
    const [errorMessage, setErrorMessage] = useState('');

    // set button error
    const [buttonError, setbuttonError] = useState(true);

    // declare addChore() and error variable for mutation
    const [addChore, { error }] = useMutation(ADD_CHORE);

    // input onChange hangler
    const handleChange = (event) => {
        const { name, value } = event.target;

        setChoreData({
            ...choreData,
            group: groupId,
            userId: userId,

            [name]: value,
        });

        setbuttonError(false);
    };

    // form submit handler -
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (choreData.choreName === '') {
            setErrorMessage('Chore Name is required!');
            setIsError(true);
            setbuttonError(true);
        } else if (choreData.assignedTo === '') {
            setErrorMessage('Please assign chore to a member!');
            setIsError(true);
            setbuttonError(true);
        } else {
            setbuttonError(false);
            setIsError(false);

            // addChore mutation
            try {
                await addChore({
                    variables: { ...choreData },
                });

                //clear form values
                setChoreData({
                    choreName: '',
                    dueDate: '',
                    assignedTo: '',
                    choreBody: '',
                });

                refetch();
            } catch (e) {
                console.error(e);
            }
        }
    };

    if (loading) {
        <div>LOADING ... </div>;
    }
    return (
        <form onSubmit={handleFormSubmit} className="form-container">
            <FormControl className="flex-row" isInvalid={isError} isRequired>
                <div className="input-container">
                    <div className="form-input">
                        <FormLabel className="form-lable">
                            Chore Name:
                        </FormLabel>
                        <Input
                            required
                            focusBorderColor="lime"
                            placeholder="Chore Name"
                            _placeholder={{ color: 'inherit' }}
                            value={choreData.choreName}
                            variant="filled"
                            name="choreName"
                            size="sm"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-input">
                        <FormLabel requiredIndicator>Finish By Date:</FormLabel>
                        <Input
                            focusBorderColor="lime"
                            placeholder="Select Date"
                            size="sm"
                            type="datetime-local"
                            variant="filled"
                            value={choreData.dueDate}
                            name="dueDate"
                            onChange={handleChange}
                            isInvalid
                            errorBorderColor="null"
                        />
                    </div>
                    <div className="form-input">
                        <FormLabel>Assigned To:</FormLabel>
                        <Select
                            required
                            focusBorderColor="lime"
                            placeholder="Select Username"
                            value={choreData.assignedTo}
                            name="assignedTo"
                            variant="filled"
                            size="sm"
                            onChange={handleChange}
                        >
                            {/* Map over users in group */}
                            {groupData.group.users.map((user, i) => (
                                <option key={user._id}>{user.username}</option>
                            ))}
                        </Select>
                    </div>
                    <div className="form-input">
                        <FormLabel requiredIndicator>Chore Notes:</FormLabel>
                        <Input
                            focusBorderColor="lime"
                            placeholder="Describe Chore"
                            _placeholder={{ color: 'inherit' }}
                            value={choreData.choreBody}
                            name="choreBody"
                            variant="filled"
                            size="sm"
                            onChange={handleChange}
                            isInvalid
                            errorBorderColor="null"
                        />
                    </div>
                </div>
                <div className="form-btn">
                    <Button
                        colorScheme="green"
                        type="click"
                        disabled={buttonError}
                        // onClick={handleFormSubmit}
                    >
                        Add This Chore
                    </Button>
                </div>
                {isError && (
                    <FormErrorMessage className="error">
                        {errorMessage}
                    </FormErrorMessage>
                )}
            </FormControl>
        </form>
    );
};

export default ChoreForm;
