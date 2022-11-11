import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Blob from "../components/blob";
import responseHandler from "../hooks/response";
import { logIn } from "../services/auth";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const red = useColorModeValue("red.50", "red.400");
  const grey = useColorModeValue("white", "gray.700");

  const click = async () => {
    const [response, error] = await logIn(email, password);
    const toastData = responseHandler(
      "Autenticación Completada",
      error,
      navigate
    );
    toast(toastData);
    if (!error && response) {
      localStorage.setItem("token", response?.auth_token);
      navigate("/");
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
        left={0}
        zIndex={-1}
        color={red}
      />
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Ingresa a tu cuenta</Heading>
        </Stack>
        <Box rounded="lg" bg={grey} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Text align="center">
                ¿Aun no tienes una cuenta?{" "}
                <Link to="/auth/signup">Registrate</Link>
              </Text>
              <Button
                bg="purple.500"
                color="white"
                _hover={{
                  bg: "purple.700",
                }}
                onClick={click}
              >
                Iniciar sesión
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LogIn;
