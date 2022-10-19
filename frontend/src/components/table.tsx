import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Wrap,
  Button,
} from "@chakra-ui/react";

const AppTable = ({
  columns,
  actions,
}: {
  columns: string[];
  actions: string[];
}) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="purple">
        <TableCaption>Archivos</TableCaption>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1 Oct 22</Td>
            <Td>El archivo</Td>
            <Td>
              <Wrap spacing={1}>
                {actions.map((action) => (
                  <Button
                    size={"md"}
                    fontWeight={"normal"}
                    fontSize={"md"}
                    px={5}
                    colorScheme={"purple"}
                    bg={"purple.500"}
                    _hover={{ bg: "purple.700" }}
                    key={action}
                  >
                    {action}
                  </Button>
                ))}
              </Wrap>
            </Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AppTable;
