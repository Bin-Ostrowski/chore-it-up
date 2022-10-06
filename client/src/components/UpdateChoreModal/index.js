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
    FormErrorMessage,
} from '@chakra-ui/react';

const UpdateChoreModal = () => {
    // set useDisclosure for updateChore modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // set State for inputs - start with original chore info
    const [choreName, setChoreName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [choreBody, setChoreBody] = useState('');
    const [isError, setisError] = useState(false);

    // will need to grap username someone so addChore will be created by that user.

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
        event.preventDefault();
        if (choreName === '') {
            setisError(true);
        } else {
            console.log(choreName, dueDate, assignedTo, choreBody);
            setisError(false);

            // update mutation
            
                setChoreName('');
                setDueDate('');
                setAssignedTo('');
                setChoreBody('');
        }
    };

    return (
        <div>
            <button onClick={onOpen} className="btn">
                Update Chore
            </button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Chore</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="form-container">
                            <FormControl
                                className="flex-row"
                                isInvalid={isError}
                                isRequired
                            >
                                <div className="input-container">
                                    <div className="form-input">
                                        <FormLabel className="form-lable">
                                            Chore Name:
                                        </FormLabel>
                                        <Input
                                            focusBorderColor="lime"
                                            placeholder="Chore Name"
                                            value={choreName}
                                            name="choreName"
                                            size="sm"
                                            onChange={handleChange}
                                        />
                                        {isError && (
                                            <FormErrorMessage className="error">
                                                Chore name is required.
                                            </FormErrorMessage>
                                        )}
                                    </div>
                                    <div className="form-input">
                                        <FormLabel requiredIndicator>
                                            Finish By Date:
                                        </FormLabel>
                                        <Input
                                            focusBorderColor="lime"
                                            placeholder="Select Date"
                                            size="sm"
                                            type="datetime-local"
                                            value={dueDate}
                                            name="dueDate"
                                            onChange={handleChange}
                                            isInvalid
                                            errorBorderColor="null"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <FormLabel requiredIndicator>
                                            Assigned To:
                                        </FormLabel>
                                        <Select
                                            focusBorderColor="lime"
                                            placeholder="Select Username"
                                            value={assignedTo}
                                            name="assignedTo"
                                            size="sm"
                                            onChange={handleChange}
                                            isInvalid
                                            errorBorderColor="null"
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
                                        <FormLabel requiredIndicator>
                                            Chore Notes:
                                        </FormLabel>
                                        <Input
                                            focusBorderColor="lime"
                                            placeholder="Describe Chore"
                                            value={choreBody}
                                            name="choreBody"
                                            size="sm"
                                            onChange={handleChange}
                                            isInvalid
                                            errorBorderColor="null"
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
