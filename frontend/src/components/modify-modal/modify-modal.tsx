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
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { ColumnDefinitionType } from "../../models/table";
import FileInput from "../../components/file-input";
import { useForm } from "react-hook-form";

import TextInput from "../text-input";

type Props<T, K extends keyof T> = {
  modifyFunction: (data: object) => void;
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
  const onSubmit = (values: object) => {
    console.log(values);
    modifyFunction(values);
    onClose();
  };

  const { handleSubmit, register } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <EditIcon onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Editar ${entityName}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <form onSubmit={handleSubmit(onSubmit)} id="data-form">
                {fields.map((field, index) => {
                  return (
                    <FormControl key={index}>
                      <FormLabel htmlFor={String(field.key)}>
                        {field.header}
                      </FormLabel>
                      {field.isFile ? (
                        <FileInput id={String(field.key)} register={register} />
                      ) : (
                        <TextInput
                          field={field}
                          register={register}
                          initial={String(entity[field.key])}
                        />
                      )}
                    </FormControl>
                  );
                })}
              </form>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancelar
            </Button>
            <Button colorScheme="purple" type="submit" form="data-form">
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppModifyModalFactory;
