import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type Props = { deleteFunction: () => void; entityName: string };
const AppDeleteModalFactory = ({ deleteFunction, entityName }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = () => {
    deleteFunction();
    onClose();
  };

  return (
    <>
      <DeleteIcon onClick={onOpen} />
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Borrar ${entityName}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              {`¿Estas seguro que deseas borrar este ${entityName}?`}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="red" onClick={onDelete}>
              Borrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppDeleteModalFactory;
