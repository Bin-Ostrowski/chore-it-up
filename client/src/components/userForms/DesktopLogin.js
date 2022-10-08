import { React, useState } from 'react';

import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react';

import './Forms.css';

const DesktopLogin = () => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });
    const [isError, setIsError] = useState();

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
        } else {
            console.log(formState);
            setIsError(false);
        }
    };

    return (
        <div className="login-form">
            <div className="form-header">
                <h2>Login</h2>
            </div>
            <FormControl isInvalid={isError} isRequired>
                <FormLabel fontSize="2xl">Username</FormLabel>
                <Input
                    name="username"
                    id="username"
                    onChange={handleChange}
                    type="username"
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
                    Login
                </Button>
            </FormControl>
        </div>
    );
};

export default DesktopLogin;
