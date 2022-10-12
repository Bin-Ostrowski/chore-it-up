import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CHORE } from '../../utils/mutations';

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

const UpdateChoreModal = ({ refetch, chore, groupData }) => {
    // set useDisclosure for updateChore modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // input state - start with original chore info
    const [updateChoreData, setUpdateChoreData] = useState({
        choreId: chore._id,
        choreName: chore.choreName,
        dueDate: chore.dueDate,
        assignedTo: chore.assignedTo,
        choreBody: chore.choreBody,
    });

    // error state
    const [isError, setIsError] = useState(false);
    // error message state
    const [errorMessage, setErrorMessage] = useState('');

    // declare updateChore() and error variable for mutation
    const [updateChore, { error }] = useMutation(UPDATE_CHORE, {
        varibles: { choreId: chore._id },
    });

    // input onChange hangler
    const handleChange = (event) => {
        const { name, value } = event.target;

        setUpdateChoreData({
            ...updateChoreData,
            [name]: value,
        });
    };

    // form submit handler -
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // chore name is requried send error if empty
        if (updateChoreData.choreName === '') {
            setErrorMessage('Chore Name is required!');
            setIsError(true);
        } else if (updateChoreData.assignedTo === '') {
            setErrorMessage('Please assign Chore!');
            setIsError(true);
        } else {
            setIsError(false);
            setUpdateChoreData({ ...updateChoreData });

            // updateChore mutation
            try {
                await updateChore({
                    variables: { ...updateChoreData },
                });

                // refetch chores data to update chore list
                refetch();
            } catch (e) {
                console.error(e);
            }

            // close modal when update completes
            onClose();
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
                                            value={updateChoreData.choreName}
                                            name="choreName"
                                            size="sm"
                                            onChange={handleChange}
                                        />
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
                                            value={updateChoreData.dueDate}
                                            name="dueDate"
                                            onChange={handleChange}
                                            isInvalid
                                            errorBorderColor="null"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <FormLabel>Assigned To:</FormLabel>
                                        <Select
                                            focusBorderColor="lime"
                                            placeholder="Select Username"
                                            value={updateChoreData.assignedTo}
                                            name="assignedTo"
                                            size="sm"
                                            onChange={handleChange}
                                        >
                                            {/* Map over users in group */}
                                            {groupData.group.users.map(
                                                (user, i) => (
                                                    <option key={user._id}>
                                                        {user.username}
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                    </div>
                                    <div className="form-input">
                                        <FormLabel requiredIndicator>
                                            Chore Notes:
                                        </FormLabel>
                                        <Input
                                            focusBorderColor="lime"
                                            placeholder="Describe Chore"
                                            value={updateChoreData.choreBody}
                                            name="choreBody"
                                            size="sm"
                                            onChange={handleChange}
                                            isInvalid
                                            errorBorderColor="null"
                                        />
                                    </div>
                                    {isError && (
                                        <FormErrorMessage className="error">
                                            {errorMessage}
                                        </FormErrorMessage>
                                    )}
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
