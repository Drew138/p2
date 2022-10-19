import { Container, Stack, Flex, useColorModeValue } from "@chakra-ui/react";
import AppTable from "../components/table";
import { useNavigate } from "react-router-dom";
import Blob from "../components/blob";

const Home = () => {
  let navigate = useNavigate();

  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 6 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <AppTable
            columns={["Fecha", "Nombre"]}
            actions={["Descargar Reporte", "Descargar Imagen"]}
          />
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("red.50", "red.400")}
          />
          <AppTable
            columns={["Fecha", "Nombre"]}
            actions={["Descargar Reporte", "Descargar Imagen"]}
          />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Home;
