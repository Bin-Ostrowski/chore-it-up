import React from 'react';
// import Auth from "../../utils/auth";
import { Link } from 'react-router-dom';

const Header = () => {
    // define logout

    return (
        <header>
            <div>
                <Link to="/">
                    <h1>Chore It Up</h1>
                </Link>
                <nav>
                    {/* add Auth.login() ? () */}
                    <>
                        <Link to="/home">Home</Link>
                        {/* <Link to="/yourChores">Your Chores</Link> */}
                        {/* <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link> */}
                    </>
                </nav>
            </div>
        </header>
    );
};

export default Header;
