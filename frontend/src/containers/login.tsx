import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import Blob from "../components/blob";

const LogIn = () => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      //bg={useColorModeValue("purple.50", "purple.800")}
    >
      <Blob
        w={"80%"}
        h={"80%"}
        position={"absolute"}
        top={"5%"}
        left={0}
        zIndex={-1}
        color={useColorModeValue("red.50", "red.400")}
      />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Ingresa a tu cuenta</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Correo electrónico</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Recordarme</Checkbox>
                <Link color={"blue.400"}>¿Olvidaste tu contraseña?</Link>
              </Stack>
              <Button
                bg={"purple.500"}
                color={"white"}
                _hover={{
                  bg: "purple.700",
                }}
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
