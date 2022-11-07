import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import React from "react";
import { ColumnDefinitionType } from "../../models/table";

type Props<T, K extends keyof T> = {
  modifyFunction: () => void;
  entityName: string;
  entity: T;
  fields: Array<ColumnDefinitionType<T, K>>;
};
const AppModifyModalFactory = <T, K extends keyof T>({
  modifyFunction,
  entityName,
  fields,
  entity,
}: Props<T, K>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = () => {
    modifyFunction();
    onClose();
  };

  return (
    <>
      <EditIcon onClick={onOpen} />
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Editar ${entityName}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              {fields.map((field) => {
                if (field.isFile) {
                  return (
                    <InputGroup>
                      <input type={"file"} multiple={true} />
                    </InputGroup>
                  );
                } else {
                  return (
                    <>
                      <FormLabel>{field.header}</FormLabel>
                      <Input
                        placeholder={field.header}
                        isDisabled={field.disabled}
                        value={String(field.isFile ? "" : entity[field.key])}
                      />
                    </>
                  );
                }
              })}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose} type="submit">
              Guardar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppModifyModalFactory;
