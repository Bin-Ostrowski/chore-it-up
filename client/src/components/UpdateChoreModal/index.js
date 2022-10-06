import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Select,
} from '@chakra-ui/react';

const UpdateChoreModal = () => {
    // set useDisclosure for updateChore modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // set State for inputs
    const [choreName, setChoreName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [choreBody, setChoreBody] = useState('');

    // input onChange hangler
    const handleChange = (event) => {
        switch (event.target.name) {
            case 'choreName':
                setChoreName(event.target.value);
                break;
            case 'dueDate':
                setDueDate(event.target.value);
                break;
            case 'assignedTo':
                setAssignedTo(event.target.value);
                break;
            case 'choreBody':
                setChoreBody(event.target.value);
                break;
        }
    };

    // form submit handler -
    const handleFormSubmit = async (event) => {
        console.log('clicked');
        event.preventDefault();

        console.log(choreName, dueDate, assignedTo, choreBody);

        // update mutation

        //     setChoreName('');
        //     setDueDate('');
        //     setAssignedTo('');
        //     setChoreBody('');
    };

    return (
        <div>
            <button onClick={onOpen} className="btn">
                update chore
            </button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Chore</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="form-container">
                            <FormControl isRequired>
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
                                    <div className="form-input">
                                        <FormLabel>Finish By Date:</FormLabel>
                                        <Input
                                            placeholder="Select Date"
                                            size="md"
                                            type="datetime-local"
                                            value={dueDate}
                                            name="dueDate"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <FormLabel optionalIndicator>
                                            Assigned To:
                                        </FormLabel>
                                        <Select
                                            placeholder="Select Username"
                                            value={assignedTo}
                                            name="assignedTo"
                                            onChange={handleChange}
                                        >
                                            {/* Map over users in group */}
                                            <option>Luffy</option>
                                            <option>Nami</option>
                                            <option>Chopper</option>
                                            <option>Zoro</option>
                                            <option>None</option>
                                        </Select>
                                    </div>
                                    <div className="form-input">
                                        <FormLabel optionalIndicator>
                                            Chore Notes:
                                        </FormLabel>
                                        <Input
                                            placeholder="Describe Chore"
                                            value={choreBody}
                                            name="choreBody"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            variant="ghost"
                            type="click"
                            onClick={handleFormSubmit}
                        >
                            Save Updated Chore
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UpdateChoreModal;
