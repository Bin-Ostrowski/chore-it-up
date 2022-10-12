import { React, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import { DesktopContainer, MobileForms } from '../components/userForms';

const Login = () => {
    function getWindowSize() {
        const { innerWidth: width, innerHeight: height } = window;

        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowSize());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowSize());
        }

        window.addEventListener('resize', handleResize);

        console.log(
            `width: ${windowDimensions.width} height: ${windowDimensions.height}`
        );
    });
    const loggedIn = Auth.loggedIn();
    if (loggedIn) {
        window.location.assign('/home');
    }

    if (windowDimensions.width > 768) {
        return <DesktopContainer />;
    }

    return <MobileForms />;
};

export default Login;
