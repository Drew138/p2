import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ColumnDefinitionType } from "../models/table";
import { nanoid } from "nanoid";
import AppDeleteModalFactory from "./delete-modal";
import AppModifyModalFactory from "./modify-modal/modify-modal";

type Props<T, K extends keyof T> = {
  data: Array<T> | undefined;
  columns: Array<ColumnDefinitionType<T, K>>;
  caption: string;
  entityName: string;
  modifyFunction: (data: { [key: string]: any }, pk: number) => void;
  deleteFunction: (id: number) => void;
};

const AppTable = <T extends { pk: number }, K extends keyof T>({
  data,
  columns,
  caption,
  entityName,
  modifyFunction,
  deleteFunction,
}: Props<T, K>) => {
  return (
    <TableContainer>
      <Table>
        <TableCaption>{caption}</TableCaption>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={nanoid()}>{column.header}</Th>
            ))}
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((entry, index) => (
            <Tr key={index}>
              {columns.map((column) => (
                <Td key={nanoid()}>
                  {column.isFile ? (
                    <a
                      href={String(entry[column.key])}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        size="md"
                        fontWeight="normal"
                        fontSize="md"
                        px={5}
                        colorScheme="purple"
                        bg="purple.500"
                        _hover={{ bg: "purple.700" }}
                        disabled={!Boolean(entry[column.key])}
                      >
                        Descargar
                      </Button>
                    </a>
                  ) : (
                    entry[column.key]
                  )}
                </Td>
              ))}
              <Td>
                <Flex flex={1} justify="space-around" align="center">
                  <AppModifyModalFactory
                    modifyFunction={(data) => modifyFunction(data, entry.pk)}
                    entity={entry}
                    entityName={entityName}
                    fields={columns}
                  />
                  <AppDeleteModalFactory
                    deleteFunction={() => deleteFunction(entry.pk)}
                    entityName={entityName}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AppTable;
