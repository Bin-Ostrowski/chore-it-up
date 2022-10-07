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
    const [choreName, setChoreName] = useState('test');
    const [dueDate, setDueDate] = useState('2022-10-11T23:11');
    const [assignedTo, setAssignedTo] = useState('Nami');
    const [choreBody, setChoreBody] = useState('test');
    const [isError, setIsError] = useState(false);

    // testing state to render new chore
    const [choreData, setChoreData] = useState({choreName, dueDate, assignedTo, choreBody});
    console.log("choreForm", choreData);

    // declare addChore() and error variable for mutation

    // will need to grap username someone so addChore will be created by that user.

    // input onChange hangler
    const handleChange = (event) => {
        switch (event.target.name) {
            case 'choreName':
                setChoreName(event.target.value);
                break;
            case 'dueDate':
                setDueDate(event.target.value);
                break;
            case 'assignedTo':
                setAssignedTo(event.target.value);
                break;
            case 'choreBody':
                setChoreBody(event.target.value);
                break;
        }
    };

    // form submit handler -
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (choreName === '') {
            setIsError(true);
        } else {
            console.log(choreName, dueDate, assignedTo, choreBody);
            setIsError(false);
            setChoreData({choreName, dueDate, assignedTo, choreBody});

            // addChore mutation

            // setChoreName('');
            // setDueDate('');
            // setAssignedTo('');
            // setChoreBody('');
        }
    };

    return (
        <div>

        <div className="form-container"
        choreData={choreData}>
            <FormControl className="flex-row" isInvalid={isError} isRequired>
                <div className="input-container">
                    <div className="form-input">
                        <FormLabel className="form-lable">
                            Chore Name:
                        </FormLabel>
                        <Input
                            focusBorderColor="lime"
                            placeholder="Chore Name"
                            value={choreName}
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
                            value={dueDate}
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
                            value={assignedTo}
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
                        <FormLabel requiredIndicator>Chore Notes:</FormLabel>
                        <Input
                            focusBorderColor="lime"
                            placeholder="Describe Chore"
                            value={choreBody}
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
        </div>
            <ChoreList 
            chore={choreData}/>
                    {/* pass chores={chores}
                groups={groups} /> */}
        </div>
    );
};

export default ChoreForm;
