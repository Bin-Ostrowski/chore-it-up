import { React, useState } from 'react';

import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import './Forms.css';

const DesktopSignup = () => {
    const [formsState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formsState,
            [name]: value,
        });

        console.log(formsState);
    };
    return (
        <div className="login-form">
            <div className="form-header">
                <h2>Sign Up</h2>
            </div>
            <FormControl>
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
                <Button
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
