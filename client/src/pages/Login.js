import { React, useEffect, useState } from 'react';
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
