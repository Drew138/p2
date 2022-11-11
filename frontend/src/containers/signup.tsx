import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Blob from "../components/blob";
import { Link } from "react-router-dom";
import { createUser } from "../services/auth";
import { useToast } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import responseHandler from "../hooks/response";

const SignUp = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const red = useColorModeValue("red.50", "red.400");
  const white = useColorModeValue("white", "gray.700");

  const click = async () => {
    const [response, error] = await createUser(email, name, lastName, password);
    const toastData = responseHandler(
      "Usuario Creado Exitosamente",
      error,
      navigate
    );
    toast(toastData);
    if (!error && response) {
      navigate("/auth/login");
    }
  };

  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Blob
        w="80%"
        h="80%"
        position="absolute"
        top="5%"
        left="0"
        zIndex="-1"
        color={red}
      />
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Regístrate
          </Heading>
        </Stack>
        <Box rounded="lg" bg={white} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg="purple.500"
                color="white"
                _hover={{
                  bg: "purple.700",
                }}
                onClick={click}
              >
                Registrarse
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align="center">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/auth/login">Inicia sesión</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
