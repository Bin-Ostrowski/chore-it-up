import React from 'react';

import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import './Forms.css';

const DesktopLogin = () => {
    return (
        <div className="login-container">
            <div className="login-form">
                <div className="form-header">
                    <h2>Login</h2>
                </div>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input type="username" />
                    <FormLabel>Password</FormLabel>
                    <Input type="password" />
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
            <div className="login-form">
                <div className="form-header">
                    <h2>Sign Up</h2>
                </div>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input type="username" />
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                    <FormLabel>Password</FormLabel>
                    <Input type="password" />
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
        </div>
    );
};

export default DesktopLogin;
