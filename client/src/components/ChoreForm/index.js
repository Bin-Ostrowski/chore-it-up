import React, { useState } from 'react';
import ChoreList from '../ChoreList';

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

            // setChoreName('');
            // setDueDate('');
            // setAssignedTo('');
            // setChoreBody('');
        }
    };

    return (
    
            <div className="form-container" choreData={choreData}>
                <FormControl
                    className="flex-row"
                    isInvalid={isError}
                    isRequired
                >
                    <div className="input-container">
                        <div className="form-input">
                            <FormLabel className="form-lable">
                                Chore Name:
                            </FormLabel>
                            <Input
                                focusBorderColor="lime"
                                placeholder="Chore Name"
                                value={choreData.choreName}
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
                            <FormLabel requiredIndicator>
                                Finish By Date:
                            </FormLabel>
                            <Input
                                focusBorderColor="lime"
                                placeholder="Select Date"
                                size="sm"
                                type="datetime-local"
                                value={choreData.dueDate}
                                name="dueDate"
                                onChange={handleChange}
                                isInvalid
                                errorBorderColor="null"
                            />
                        </div>
                        <div className="form-input">
                            <FormLabel requiredIndicator>
                                Assigned To:
                            </FormLabel>
                            <Select
                                focusBorderColor="lime"
                                placeholder="Select Username"
                                value={choreData.assignedTo}
                                name="assignedTo"
                                size="sm"
                                onChange={handleChange}
                                isInvalid
                                errorBorderColor="null"
                            >
                                {/* Map over users in group */}
                                <option>Luffy</option>
                                <option>Nami</option>
                                <option>Chopper</option>
                                <option>Zoro</option>
                                <option>None</option>
                            </Select>
                        </div>
                        <div className="form-input">
                            <FormLabel requiredIndicator>
                                Chore Notes:
                            </FormLabel>
                            <Input
                                focusBorderColor="lime"
                                placeholder="Describe Chore"
                                value={choreData.choreBody}
                                name="choreBody"
                                size="sm"
                                onChange={handleChange}
                                isInvalid
                                errorBorderColor="null"
                            />
                        </div>
                    </div>
                    <div className="form-btn">
                        <Button
                            colorScheme="blue"
                            type="click"
                            onClick={handleFormSubmit}
                        >
                            Add This Chore
                        </Button>
                    </div>
                </FormControl>
                <ChoreList chore={choreData} />
                {/* pass chores={chores}
                    groups={groups} /> */}
            </div>
    );
};

export default ChoreForm;
