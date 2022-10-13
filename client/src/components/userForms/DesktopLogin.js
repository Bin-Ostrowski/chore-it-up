import { React, useState } from 'react';

import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react';

import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import './Forms.css';

const DesktopLogin = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });
    const [login, { error }] = useMutation(LOGIN_USER);
    // used for chakra error handling in the login form
    const [isError, setIsError] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // error handling
        if (!formState.email.match(emailRegex)) {
            setErrorMessage('invalid email');
            setIsError(true);
        } else if (formState.password.length < 5) {
            setErrorMessage('invalid password');
            setIsError(true);
        } else {
            setErrorMessage('');
            setIsError(false);
        }

        if (!isError) {
            try {
                // sends state data to login mutation
                const { data } = await login({
                    variables: { ...formState },
                });

                Auth.login(data.login.token);
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div className="login-form">
            <div className="form-header">
                <h2>Login</h2>
            </div>
            <form>
                <FormControl isInvalid={isError} isRequired>
                    <FormLabel fontSize="2xl">Email:</FormLabel>
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
                            {errorMessage}
                        </FormErrorMessage>
                    )}
                    <Button
                        onClick={handleFormSubmit}
                        type="submit"
                        className="button"
                        colorScheme="green.400"
                        variant="outline"
                        size="lg"
                    >
                        Login
                    </Button>
                </FormControl>
            </form>
        </div>
    );
};

export default DesktopLogin;
