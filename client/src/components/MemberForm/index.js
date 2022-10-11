import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USER_TO_GROUP } from '../../utils/mutations';
import { QUERY_USERS } from '../../utils/queries';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
} from '@chakra-ui/react';

import './memberForm.css';

const MemberForm = ({ userData }) => {
    // query users
    const { loading, data } = useQuery(QUERY_USERS);

    // define addUserToGroup mutation
    const [addUserToGroup, { error }] = useMutation(ADD_USER_TO_GROUP);

    // set State for inputs
    const [member, setMember] = useState({
        userId: userData._id,
        groupId: userData.group._id,
        username: userData.username,
    });
    // Set error State for FormController
    const [isError, setIsError] = useState(false);

    // input onChange handler
    const handleChange = (event) => {
        setIsError(false);
        const { name, value } = event.target;
        setMember({
            ...member,
            [name]: value,
        });
    };

    // form submit handler
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Filter users in DB to match input
        const result = data.users.filter(
            (user) => user.username === member.username
        );

        // if input value is empty or if username is not in database return errorMessage
        if (member.username === '' || result.length == 0) {
            setIsError(true);
        } else {
            const { _id, username } = result[0];
            // deconstruct result
            setIsError(false);
            setMember({ ...member, userId: _id, username: username });

            // addUserToGroup mutation
            try {
                await addUserToGroup({
                    variables: { ...member },
                });
            } catch (e) {
                console.error(e);
            }
            console.log('added');

            // //clear set member state but leave groupId the same
            // setMember({...member, userId: '', username: '' });
        }
    };

    if (loading) {
        return (
            <div className="member-form-container">
                <h3>Loading...</h3>
            </div>
        );
    }

    return (
        <FormControl className="flex-row" isInvalid={isError} isRequired>
            <div className="input-container">
                <FormLabel className="form-label">Username:</FormLabel>
                <Input
                    type="text"
                    focusBorderColor="black"
                    variant="filled"
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
                <Button onClick={handleFormSubmit}>Add Member</Button>
            </div>
        </FormControl>
    );
};

export default MemberForm;
