import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Blob from "../components/blob";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Blob
        w={"120%"}
        h={"120%"}
        position={"absolute"}
        top={"5%"}
        left={0}
        zIndex={-1}
        color={useColorModeValue("red.50", "red.400")}
      />
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, purple.400, purple.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="20px" mt={3} mb={2}>
        Página No Encontrada
      </Text>
      <Text color={"gray.600"} mb={6}>
        La página que estás buscando parece que no existe
      </Text>
      <Link to="/">
        <Button
          colorScheme="purple"
          bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
          color="white"
          variant="solid"
        >
          Volver al Inicio
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;

