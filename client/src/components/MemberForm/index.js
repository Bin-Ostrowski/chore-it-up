import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USER_TO_GROUP } from '../../utils/mutations';
import { QUERY_ME, QUERY_USERS } from '../../utils/queries';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    Button,
} from '@chakra-ui/react';

import './memberForm.css';

const MemberForm = ({ userData }) => {
    // query users to get all users to populate member drop down list
    const { loading, data } = useQuery(QUERY_USERS);

    // define addUserToGroup mutation
    const [addUserToGroup, { error }] = useMutation(ADD_USER_TO_GROUP);

    // console.log('users data', data);
    // console.log('memberForm userdata', userData);

    // set State for inputs
    const [member, setMember] = useState({
        userId: userData._id,
        groupId: userData.group._id,
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
        // event.preventDefault();
        if (member.username === '') {
            setIsError(true);
        } else {
            console.log('submit', member);
            setIsError(false);
            setMember({ ...setMember });

            // addUserToGroup mutation
            try {
                await addUserToGroup({
                    variables: { ...member },
                });

                console.log(member);
            } catch (e) {
                console.error(e);
            };

            // setMember('');
        };
    };

    return (
        <div className="member-form-container">
            <div className="members">
                <h2>Group Members:</h2>
                <ul>
                    {/* //map thought group members */}
                    <li className="username-list">
                        <div>{member.userId} </div>
                    </li>
                </ul>
            </div>
            <FormControl className="flex-row" isInvalid={isError} isRequired>
                <div className="input-container">
                    <FormLabel className="form-lable">Username:</FormLabel>
                    <Select
                        focusBorderColor="black"
                        variant="filled"
                        placeholder="username"
                        value={member.userId}
                        name="username"
                        size="sm"
                        onChange={handleChange}
                    >
                        {/* Map over all users */}
                        {/* remove me from map */}
                        {data &&
                            data.users.map((users) => {
                                return (
                                    <option key={users._id}>
                                        {users.username}
                                    </option>
                                );
                            })}
                    </Select>

                    {isError && (
                        <FormErrorMessage
                            errorMessageColor="red"
                            className="error"
                        >
                            That username does not exist!
                        </FormErrorMessage>
                    )}
                </div>

                <div className="form-btn">
                    <Button
                        colorScheme="green"
                        type="click"
                        onClick={handleFormSubmit}
                    >
                        Add Member
                    </Button>
                </div>
            </FormControl>
        </div>
    );
};

export default MemberForm;
