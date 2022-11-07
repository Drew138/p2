import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import Blob from "../components/blob";
import Footer from "../components/footer";
import NavLink from "../components/navbar";
import FileTable from "./file-table/file-table";
import ReportTable from "./report-table/report-table";

const Home = () => {
  return (
    <Container maxW="10xl">
      <NavLink />
      <Flex
        flex={1}
        justify="space-evenly"
        align="top"
        position="relative"
        w="full"
        marginTop={50}
        minH={700}
      >
        <FileTable />
        <Blob
          w="150%"
          h="150%"
          position="absolute"
          top="-20%"
          left={0}
          zIndex={-1}
          color={useColorModeValue("red.50", "red.400")}
        />
        <ReportTable />
      </Flex>
      <Footer />
    </Container>
  );
};

export default Home;
