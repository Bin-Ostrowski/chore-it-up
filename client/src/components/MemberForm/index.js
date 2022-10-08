import React, { useState } from 'react';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
} from '@chakra-ui/react';

import './memberForm.css';

const MemberForm = () => {
    // set State for inputs
    const [member, setMember] = useState({
        username: 'testUserName',
    });
    console.log('memberForm', member);

    // Set error State
    const [isError, setIsError] = useState(false);

    // declare addUserToGroup and error variable for mutation

    // will need to grab groupID so addUserToGroup will be created by that user.

    // input onChange hangler
    const handleChange = (event) => {
        const { name, value } = event.target;

        setMember({
            ...member,
            [name]: value,
        });
    };

    // form submit handler -
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (member.username === '') {
            setIsError(true);
        } else {
            console.log(member);
            setIsError(false);
            setMember({ ...setMember });

            // addUserToGroup mutation

            // setMember('');
        }
    };

    return (
        <div className="member-form-container">
            <FormControl className="flex-row" isInvalid={isError} isRequired>
                {/* <div className="input-container"> */}
                <div className="form-input">
                    <FormLabel className="form-lable">Username:</FormLabel>
                    <Input
                        focusBorderColor="lime"
                        placeholder="username"
                        value={member.username}
                        name="username"
                        size="sm"
                        onChange={handleChange}
                    />
                    {isError && (
                        <FormErrorMessage className="error">
                            That username does not exist!
                        </FormErrorMessage>
                    )}
                </div>

                <div className="form-btn">
                    <Button
                        colorScheme="blue"
                        type="click"
                        onClick={handleFormSubmit}
                    >
                        Add Member
                    </Button>
                </div>
            </FormControl>

            <h2>Group Members</h2>
            <ul>
                {/* //map thought group members */}
                <li>
                    <div className="list-text">{member.username} </div>
                </li>
            </ul>
        </div>
    );
};

export default MemberForm;
