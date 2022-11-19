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
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import responseHandler from "../hooks/response";
import { useNavigate } from "react-router-dom";
import { postReport } from "../services/report";

const CreateReportModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [disabled, setDisabled] = useState(true);
  const ref = useRef<any>();

  const { mutate: createReport } = useMutation(
    "create-file",
    async () => {
      const [_, error] = await postReport({ year: ref.current.value });
      const toastData = responseHandler(
        "Archivo Creado Exitosamente",
        error,
        navigate
      );
      toast(toastData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("reports");
      },
    }
  );
  const onChange = (e: React.ChangeEvent<HTMLElement>) => {
    setDisabled(ref.current?.value === "");
  };

  const onSubmit = async () => {
    createReport();
    onClose();
  };

  return (
    <>
      <Button
        size="md"
        fontWeight="normal"
        fontSize="md"
        px={5}
        colorScheme="purple"
        bg="purple.700"
        _hover={{ bg: "purple.900" }}
        maxW="150"
        onClick={onOpen}
      >
        Generar Reporte
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            color="purple.700"
            textAlign="center"
            fontWeight="semibold"
          >
            Generar Reporte
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>
                Selecciona el año del reporte que deseas generar
              </FormLabel>
              <Select
                placeholder="Seleccione una opción"
                ref={ref}
                onChange={onChange}
              >
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancelar
            </Button>
            <Button colorScheme="purple" disabled={disabled} onClick={onSubmit}>
              Generar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateReportModal;
