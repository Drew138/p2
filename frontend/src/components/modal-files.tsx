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
} from '@chakra-ui/react';
import React from 'react';
import Upload from './upload-files';

export default function Files() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <>

        <Button 
            size={"md"}
            fontWeight={"normal"}
            fontSize={"md"}
            px={5}
            colorScheme={"purple"}
            bg={"purple.700"}
            _hover={{ bg: "purple.900" }}
            onClick={onOpen}>Subir Imagen
        </Button>
    
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Subir Imagen</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Upload />
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='purple' mr={3}>
                Subir
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}