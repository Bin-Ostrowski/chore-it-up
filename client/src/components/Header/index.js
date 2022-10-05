import React from 'react';
// import Auth from "../../utils/auth";
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const Header = () => {
    // define logout

    const navBoxStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        padding: '20px',
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    };

    const hoverStyles = {
        textShadow: '0 0 20px black',
    };

    return (
        <header>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                h="50px"
                bgColor="green.400"
            >
                <Box sx={navBoxStyles} _hover={hoverStyles}>
                    <Link to="/">
                        <h1>Chore It Up</h1>
                    </Link>
                </Box>
                <nav>
                    {/* add Auth.login() ? () */}
                    <Box sx={navBoxStyles}>
                        <>
                            <Box _hover={hoverStyles}>
                                <Link to="/home">Home</Link>
                            </Box>
                            <Box paddingLeft='20px' _hover={hoverStyles}>
                                <Link to="/chores">Your Chores</Link>
                            </Box>
                            {/* <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link> */}
                        </>
                    </Box>
                </nav>
            </Box>
        </header>
    );
};

export default Header;
