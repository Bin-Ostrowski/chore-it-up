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
    const [isError, setIsError] = useState();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!formState.email.match(emailRegex)) {
            setIsError(true);
        } else if (formState.password.length < 5) {
            setIsError(true);
        } else {
            setIsError(false);
        }

        if (!isError) {
            try {
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
                        invalid form info!
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
        </div>
    );
};

export default DesktopLogin;
