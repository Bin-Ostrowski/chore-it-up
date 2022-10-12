import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
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
    console.log('choreModal', chore);
    console.log('groupData', groupData);

    // set useDisclosure for updateChore modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // set State for inputs - start with original chore info
    const [updateChoreData, setUpdateChoreData] = useState({
        choreId: chore._id,
        choreName: chore.choreName,
        dueDate: chore.dueDate,
        assignedTo: chore.assignedTo,
        choreBody: chore.choreBody,
    });
    console.log('updated chore', updateChoreData);

    // error state
    const [isError, setIsError] = useState(false);

     // declare updateChore() and error variable for mutation
     const [updateChore, { error }] = useMutation(UPDATE_CHORE, {
        varibles: {choreId: chore._id}
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
        if (chore.choreName === '') {
            setIsError(true);
        } else {
            console.log(updateChoreData);
            setIsError(false);
            setUpdateChoreData({ ...updateChoreData });

            // updateChore mutation
            try {
                await updateChore({
                    variables: {...updateChoreData}
                })
                console.log('successful chore update', updateChoreData)
                refetch();
            } catch (e) {
                console.error(e);
            }

            
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
                                            value={updateChoreData.dueDate}
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
                                            value={updateChoreData.assignedTo}
                                            name="assignedTo"
                                            size="sm"
                                            onChange={handleChange}
                                            isInvalid
                                            errorBorderColor="null"
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
