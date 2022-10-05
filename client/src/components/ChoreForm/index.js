import React from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Button,
} from '@chakra-ui/react';

import './choreForm.css';

const ChoreForm = () => {
    return (
        <FormControl isRequired>
            <div className="form-input">
                <FormLabel>Chore Name:</FormLabel>
                <Input placeholder="Chore Name" />
            </div>
            <div className="form-input">
                <FormLabel>Finish By Date:</FormLabel>
                <Input
                    placeholder="Select Date"
                    size="md"
                    type="datetime-local"
                />
            </div>
            <div className="form-input">
                <FormLabel optionalIndicator>Assigned To:</FormLabel>
                <Select placeholder="Select Username">
                    {/* Map over users in group */}
                    <option>Luffy</option>
                    <option>Nami</option>
                    <option>Chopper</option>
                    <option>Zoro</option>
                    <option>None</option>
                </Select>
            </div>
            <div className="form-input">
                <FormLabel optionalIndicator>Chore Notes:</FormLabel>
                <Input placeholder="Describe Chore" />
            </div>
            <Button colorScheme='blue'>Add Chore</Button>
        </FormControl>
    );
};

export default ChoreForm;
