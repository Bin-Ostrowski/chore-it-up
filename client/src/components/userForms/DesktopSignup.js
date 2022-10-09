import { React, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
} from '@chakra-ui/react';

import './Forms.css';

const DesktopSignup = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isError, setIsError] = useState();

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });

        console.log(formState);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (formState.username === '') {
            setIsError(true);
        } else if (formState.password.length < 5) {
            setIsError(true);
        } else if (!formState.email.match(emailRegex)) {
            setIsError(true);
        } else {
            console.log(formState);
            setIsError(false);
        }

        if (!isError) {
            try {
                const { data } = await addUser({
                    variables: { ...formState },
                });

                Auth.login(data.addUser.token);
                window.location.replace('/home');
            } catch (e) {
                console.error(e);
                console.log(e, null, 2);
            }
        }
    };

    return (
        <div className="login-form">
            <div className="form-header">
                <h2>Sign Up</h2>
            </div>
            <FormControl isInvalid={isError} isRequired>
                <FormLabel fontSize="2xl">Username</FormLabel>
                <Input
                    name="username"
                    id="username"
                    onChange={handleChange}
                    type="username"
                />
                <FormLabel fontSize="2xl">Email address</FormLabel>
                <Input
                    name="email"
                    id="email"
                    onChange={handleChange}
                    type="email"
                />
                <FormLabel fontSize="2xl">Password</FormLabel>
                <Input
                    name="password"
                    id="password"
                    onChange={handleChange}
                    type="password"
                />
                {isError && (
                    <FormErrorMessage className="error">
                        invalid form info!
                    </FormErrorMessage>
                )}
                <Button
                    onClick={handleFormSubmit}
                    className="button"
                    colorScheme="green.400"
                    variant="outline"
                    size="lg"
                >
                    Sign Up
                </Button>
            </FormControl>
        </div>
    );
};

export default DesktopSignup;
