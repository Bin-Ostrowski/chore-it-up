import React from 'react';
import DesktopLogin from './DesktopLogin';
import DesktopSignup from './DesktopSignup';

import './Forms.css';

const DesktopContainer = () => {
    return (
        <main className="login-container">
            <DesktopLogin />
            <DesktopSignup />
        </main>
    );
};

export default DesktopContainer;
