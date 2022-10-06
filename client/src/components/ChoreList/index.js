import React from 'react';
import ChoreForm from '../ChoreForm';
import './choreList.css';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from '@chakra-ui/react';


// do we ant to link the group to view SingleGroup page?
// import { Link } from "react-router-dom";

// pass in props for chores array, group array for that user
const ChoreList = () => {

    // set useDisclosure for modal
    const { isOpen, onOpen, onClose } = useDisclosure()

    // conditionaly render chores
    
    // else return map of list of thoughts
    return (
        <ul>
            {/* // map thought chores */}
            <li className="list">
                <div className="list-text">
                    <div>Take Out The Trash dueDate</div>
                    <div>
                        Place at end of the driveway every wednesday night
                    </div>
                </div>
                <div className="list-btns">
                    <button onClick={onOpen} className="btn">update chore</button>
                    
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Update Chore</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <ChoreForm />
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                                <Button variant="ghost"  onClick={onClose}>
                                    Save Updated Chore
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                    <button className="btn">finish chore</button>
                    <button className="btn">add to google calendar</button>
                </div>
            </li>
            <li className="list">
                <div className="list-text">
                    <div>Take Out The Trash dueDate</div>
                    <div>
                        Place at end of the driveway every wednesday night
                    </div>
                </div>
                <div className="list-btns">
                    <button className="btn">update chore</button>
                    <button className="btn">finish chore</button>
                    <button className="btn">add to google calendar</button>
                </div>
            </li>
        </ul>
    );
};

export default ChoreList;
