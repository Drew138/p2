import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  AspectRatio,
  Box,
  Container,
  Input,
  Stack,
  Text,
  Heading,
  useDisclosure,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useState } from "react";
import { postFile } from "../../services/file";
import { first, second, third } from "./css-props";
import PreviewImage from "./preview-image";
import { useNavigate } from "react-router-dom";
import responseHandler from "../../hooks/response";
import { useMutation, useQueryClient } from "react-query";

const CreateFileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tmp = e.target.files ? e.target.files[0] : null;
    setFile(tmp);
  };

  const { mutate: createFile } = useMutation(
    "create-file",
    async () => {
      const [_, error] = await postFile({ image: file });
      const toastData = responseHandler(
        "Archivo Creado Exitosamente",
        error,
        navigate
      );
      toast(toastData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("files");
      },
    }
  );

  const onSubmit = async () => {
    if (file) {
      createFile();
    }
    onClose();
  };

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
        onClick={onOpen}
        maxW="150"
      >
        Subir Imagen
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
            <Container my="12">
              <AspectRatio width="64" ratio={1} left="15%">
                <Box
                  borderColor="gray.300"
                  borderStyle="dashed"
                  borderWidth="2px"
                  rounded="md"
                  shadow="sm"
                  role="group"
                  transition="all 150ms ease-in-out"
                  _hover={{
                    shadow: "md",
                  }}
                  as={motion.div}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                >
                  <Box position="relative" height="100%" width="100%">
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      height="100%"
                      width="100%"
                      display="flex"
                      flexDirection="column"
                    >
                      <Stack
                        height="100%"
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justify="center"
                        spacing="4"
                      >
                        <Box height="16" width="12" position="relative">
                          <PreviewImage
                            variants={first}
                            backgroundImage="url('https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg')"
                          />
                          <PreviewImage
                            variants={second}
                            backgroundImage="url('https://images.unsplash.com/photo-1557487307-8dc8ec048eb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')"
                          />
                          <PreviewImage
                            variants={third}
                            backgroundImage={`url("https://images.unsplash.com/photo-1600751550112-4209be589cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80")`}
                          />
                        </Box>
                        <Stack p="8" textAlign="center" spacing="1">
                          <Heading
                            fontSize="lg"
                            color="gray.700"
                            fontWeight="bold"
                          >
                            Arrastra las fotos aquí
                          </Heading>
                          <Text fontWeight="light">
                            o haz click para seleccionar
                          </Text>
                        </Stack>
                      </Stack>
                    </Box>
                    <Input
                      type="file"
                      height="100%"
                      width="100%"
                      position="absolute"
                      top="0"
                      left="0"
                      opacity="0"
                      aria-hidden="true"
                      accept="image/*"
                      onDragEnter={startAnimation}
                      onDragLeave={stopAnimation}
                      onChange={(e) => handleFile(e)}
                    />
                  </Box>
                </Box>
              </AspectRatio>
            </Container>
          </ModalBody>

          <Flex justify="center">
            <Text>{file?.name}</Text>
          </Flex>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="purple" onClick={onSubmit}>
              Subir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateFileModal;
