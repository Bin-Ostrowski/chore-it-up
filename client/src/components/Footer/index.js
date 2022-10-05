import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer = () => {
    return (
        <footer>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100%"
                h="50px"
                bgColor="green.400"
                bottom="0px"
            >
                <div>&copy;2022 by Chore It Up</div>
            </Box>
        </footer>
    );
};

export default Footer;
