import { React, useState } from 'react';

import './Forms.css';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
} from '@chakra-ui/react';

const MobileLogin = () => {
    const [isLoginHidden, setIsLoginHidden] = useState(true);
    const [isSignUpHidden, setIsSignUpHidden] = useState(true);

    function toggleLogin() {
        if (!isSignUpHidden) {
            setIsSignUpHidden((current) => !current);
        }
        setIsLoginHidden((current) => !current);
    }

    function toggleSignUp() {
        if (!isLoginHidden) {
            setIsLoginHidden((current) => !current);
        }
        setIsSignUpHidden((current) => !current);
    }

    return (
        <div className="login-container-mobile">
            {!isLoginHidden && (
                <div className="login-mobile">
                    <div
                        className="form-header"
                        style={{
                            width: '70%',
                            'margin-left': 'auto',
                            'margin-right': 'auto',
                        }}
                    >
                        <h2>Login</h2>
                    </div>
                    <FormControl>
                        <FormLabel fontSize="2xl">Username</FormLabel>
                        <Input type="username" />
                        <FormLabel fontSize="2xl">Password</FormLabel>
                        <Input type="password" />
                        <Button
                            className="button"
                            colorScheme="green.400"
                            variant="solid"
                            size="lg"
                            style={{ 'background-color': '#48bb78' }}
                        >
                            Login
                        </Button>
                    </FormControl>
                </div>
            )}

            {!isSignUpHidden && (
                <div className="login-mobile" style={{ height: '500px' }}>
                    <div
                        className="form-header"
                        style={{
                            width: '70%',
                            'margin-left': 'auto',
                            'margin-right': 'auto',
                        }}
                    >
                        <h2>Sign Up</h2>
                    </div>
                    <FormControl>
                        <FormLabel fontSize="2xl">Username</FormLabel>
                        <Input type="username" />
                        <FormLabel fontSize="2xl">Email address</FormLabel>
                        <Input type="email" />
                        <FormLabel fontSize="2xl">Password</FormLabel>
                        <Input type="password" />
                        <Button
                            className="button"
                            colorScheme="green.400"
                            variant="solid"
                            size="lg"
                            style={{ 'background-color': '#48bb78' }}
                        >
                            Sign Up
                        </Button>
                    </FormControl>
                </div>
            )}

            <div
                className="toggle"
                onClick={toggleSignUp}
                style={{ 'background-color': '#F6AD55' }}
            >
                Sign Up
            </div>
            <div className="toggle" onClick={toggleLogin}>
                Login
            </div>
        </div>
    );
};

export default MobileLogin;
