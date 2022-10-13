import React from 'react';
import { Box } from '@chakra-ui/react';

import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100%"
                h="50px"
                bgColor="green.400"
            >
                <div>&copy;2022 by Chore It Up</div>
            </Box>
        </footer>
    );
};

export default Footer;
