import React from 'react';
import DesktopLogin from './DesktopLogin';
import DesktopSignup from './DesktopSignup';

import './Forms.css';

const DesktopContainer = () => {
    return (
        <div className="login-container">
            <DesktopLogin />
            <DesktopSignup />
        </div>
    );
};

export default DesktopContainer;
