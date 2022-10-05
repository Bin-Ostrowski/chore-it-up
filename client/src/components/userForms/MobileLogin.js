import { React, useState } from 'react';

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
            )}

            {!isSignUpHidden && (
                <div className="login-mobile">
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
