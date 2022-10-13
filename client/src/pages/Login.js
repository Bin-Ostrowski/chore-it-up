import { React, useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { DesktopContainer, MobileForms } from '../components/userForms';

const Login = () => {
    // function to get the current window size and set the width and height variables
    function getWindowSize() {
        const { innerWidth: width, innerHeight: height } = window;

        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowSize());

    // function runs to always check the window size to decide which login page to show
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowSize());
        }

        window.addEventListener('resize', handleResize);
    });
    // prevents logged in user from getting to the login screen
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
