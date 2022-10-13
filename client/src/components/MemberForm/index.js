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

const MemberForm = ({ refetch, groupData }) => {
    // query users
    const { loading, data } = useQuery(QUERY_USERS);

    // define addUserToGroup mutation
    const [addUserToGroup, { error }] = useMutation(ADD_USER_TO_GROUP);

    // set State for inputs
    const [member, setMember] = useState(
        null

        // userId: groupData._id,
        // groupId: groupData.group._id,
        // username: groupData.username,
    );
    // Set error State for FormController
    const [isError, setIsError] = useState(false);

    // input onChange handler
    const handleOnInput = (event) => {
        setIsError(false);

        const { value } = event.target;

        // Filter users in DB to match input
        const result = data.users.filter((user) => user.username === value);

        // if input value is empty or if username is not in database return errorMessage
        if (result.length == 0) {
            setIsError(true);
            setMember(null);
        } else {
            // deconstruct result
            setIsError(false);
            setMember(result[0]);
        }
    };

    // form submit handler
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // addUserToGroup mutation
        try {
            await addUserToGroup({
                variables: {
                    userId: member._id,
                    groupId: groupData.group._id,
                    username: member.username,
                },
            });

            // retech DB query to display added member.
            refetch();
        } catch (e) {
            console.error(e);
        }

        // //clear set member state but leave groupId the same
        // setMember({...member, userId: '', username: '' });
    };

    if (loading) {
        return (
            <div className="member-form-container">
                <h3>Loading...</h3>
            </div>
        );
    }

    return (
        <form>
            <FormControl className="flex-row" isInvalid={isError} isRequired>
                <div className="input-container">
                    <FormLabel className="form-label">Username:</FormLabel>
                    <Input
                        type="text"
                        focusBorderColor="black"
                        variant="filled"
                        placeholder="username"
                        _placeholder={{ color: 'inherit' }}
                        name="username"
                        size="sm"
                        onInput={handleOnInput}
                    />
                    {isError && (
                        <FormErrorMessage className="error">
                            That username does not exist!
                        </FormErrorMessage>
                    )}
                </div>

                <div className="form-btn">
                    <Button
                        mt={8}
                        disabled={!member}
                        onClick={handleFormSubmit}
                    >
                        Add Member
                    </Button>
                </div>
            </FormControl>
        </form>
    );
};

export default MemberForm;
