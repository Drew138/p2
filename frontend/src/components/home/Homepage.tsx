import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Icon,
  IconProps,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Wrap,
} from '@chakra-ui/react';

export default function Homepage() {
  return (
    <Container maxW={'7xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 6 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <TableContainer>
            <Table variant='striped' colorScheme='purple'>
              <TableCaption>Archivos</TableCaption>
              <Thead>
                <Tr>
                  <Th>Fecha</Th>
                  <Th>Nombre</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1 Oct 22</Td>
                  <Td>El archivo</Td>
                  <Td>
                    <Wrap spacing={1}>
                      {techStackButton("Descargar","Reporte")}
                      {techStackButton("Descargar","Imagen")}
                      {techStackButton("Editar","")}
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
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
          <Blob
            w={'150%'}
            h={'150%'}
            position={'absolute'}
            top={'-20%'}
            left={0}
            zIndex={-1}
            color={useColorModeValue('red.50', 'red.400')}
          />
          <TableContainer>
            <Table variant='striped' colorScheme='purple'>
              <TableCaption>Consolidados</TableCaption>
              <Thead>
                <Tr>
                  <Th>Fecha Actualización</Th>
                  <Th>Nombre</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>10 Oct 22</Td>
                  <Td>El Consolidado</Td>
                  <Td>
                    <Wrap spacing={1}>
                      {techStackButton("Descargar","Consolidado")}
                      {techStackButton("Editar","")}
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
        </Flex>
      </Stack>
    </Container>
  );
}

function techStackButton(text: string, text2: string){
  return (
    <Button
      size={'md'}
      fontWeight={'normal'}
      fontSize={'md'}
      px={5}
      colorScheme={'purple'}
      bg={'purple.500'}
      _hover={{ bg: 'purple.700' }}>
      {text}<br></br>{text2}
    </Button>
  );
}

export const Blob = (props: IconProps) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};