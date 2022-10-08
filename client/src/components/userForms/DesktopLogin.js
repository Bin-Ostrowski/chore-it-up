import { React, useState } from 'react';

import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import './Forms.css';

const DesktopLogin = () => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });

        console.log(formState);
    };

    return (
        <div className="login-form">
            <div className="form-header">
                <h2>Login</h2>
            </div>
            <FormControl>
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
                <Button
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
