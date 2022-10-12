import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { QUERY_GROUP } from '../../utils/queries';

const Header = () => {
    const { loading, error, data, refetch } = useQuery(QUERY_GROUP);

    // define logout
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const navBoxStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        padding: '20px',
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    };

    const hoverStyles = {
        textShadow: '0 0 20px black',
    };

    const loggedIn = Auth.loggedIn();

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
                <Box sx={navBoxStyles}>
                    {/* <Link to="/">
                        <h1>Chore It Up</h1>
                    </Link> */}
                    <h1>Chore It Up</h1>
                </Box>
                <nav>
                    {/* add Auth.login() ? () */}
                    <Box sx={navBoxStyles}>
                        <>
                            <Box _hover={hoverStyles}>
                                <Link to="/home" onClick={refetch}>
                                    Home
                                </Link>
                            </Box>
                            <Box paddingLeft="20px" _hover={hoverStyles}>
                                <Link to="/chores">Your Chores</Link>
                            </Box>
                            {loggedIn && (
                                <Box paddingLeft={'20px'} _hover={hoverStyles}>
                                    <a href="/" onClick={logout}>
                                        Logout
                                    </a>
                                </Box>
                            )}

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
