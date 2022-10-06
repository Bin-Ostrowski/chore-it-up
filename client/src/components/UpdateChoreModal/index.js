import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react';

import React from 'react';
import ChoreForm from '../ChoreForm';
const { isOpen, onOpen, onClose } = useDisclosure();

<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>Update Chore</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <FormControl isRequired>
                <div className="flex-row">
                    <div className="input-container">
                        <div className="form-input">
                            <FormLabel>Chore Name:</FormLabel>
                            <Input
                                placeholder="Chore Name"
                                value={choreName}
                                name="choreName"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </FormControl>
        </ModalBody>

        <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
    </ModalContent>
</Modal>;
