import { React, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import { DesktopLogin, MobileLogin } from '../components/userForms';

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

    if (windowDimensions.width > 768) {
        return <DesktopLogin />;
    }

    return <MobileLogin />;
};

export default Login;
