import React, { useState } from 'react';
import ChoreList from '../ChoreList';
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

const ChoreForm = () => {
    // set State for inputs
    const [choreData, setChoreData] = useState({
        choreName: 'testName',
        dueDate: '2022-10-11T23:11',
        assignedTo: 'Nami',
        choreBody: 'testBody',
    });
    console.log('choreForm', choreData);

    // Set error State
    const [isError, setIsError] = useState(false);

    // declare addChore() and error variable for mutation
    const [addChore, { error }] = useMutation(ADD_CHORE);

    // will need to grap username and groupID someone so addChore will be created by that user.

    // input onChange hangler
    const handleChange = (event) => {
        const { name, value } = event.target;

        setChoreData({
            ...choreData,
            [name]: value,
        });
    };

    // form submit handler -
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (choreData.choreName === '') {
            setIsError(true);
        } else {
            console.log(choreData);
            setIsError(false);
            setChoreData({ ...choreData });

            // addChore mutation
            try {
                await addChore({
                    variables: { ...choreData },
                })

                //clear form values
                // setChoreName('');
                // setDueDate('');
                // setAssignedTo('');
                // setChoreBody('');
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div className="form-container">
            <FormControl className="flex-row" isInvalid={isError} isRequired>
                <div className="input-container">
                    <div className="form-input">
                        <FormLabel className="form-lable">
                            Chore Name:
                        </FormLabel>
                        <Input
                            focusBorderColor="lime"
                            placeholder="Chore Name"
                            value={choreData.choreName}
                            variant="filled"
                            name="choreName"
                            size="sm"
                            onChange={handleChange}
                        />
                        {isError && (
                            <FormErrorMessage className="error">
                                Chore name is required.
                            </FormErrorMessage>
                        )}
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
                        <FormLabel requiredIndicator>Assigned To:</FormLabel>
                        <Select
                            focusBorderColor="lime"
                            placeholder="Select Username"
                            value={choreData.assignedTo}
                            name="assignedTo"
                            variant="filled"
                            size="sm"
                            onChange={handleChange}
                            isInvalid
                            errorBorderColor="null"
                        />
                    </div>
                    <div className="form-input">
                        <FormLabel requiredIndicator>Chore Notes:</FormLabel>
                        <Input
                            focusBorderColor="lime"
                            placeholder="Describe Chore"
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
                        onClick={handleFormSubmit}
                    >
                        Add This Chore
                    </Button>
                </div>
            </FormControl>
            <ChoreList chore={choreData} />
        </div>
    );
};

export default ChoreForm;
