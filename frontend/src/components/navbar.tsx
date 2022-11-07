import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react';
import ReactLogo from '../assets/logo.svg';
import Files from './modal-files';

const Logo = (props: any) => {
  return (
      <div className="App">
          <img 
            src={ReactLogo} 
            alt="React Logo" 
            width={"10%"}
          />
      </div>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('purple.100', 'purple.700')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Logo /></Box>
          </HStack>
          <Flex alignItems={'center'}>
            <Wrap spacing={10}>
              <Files />
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={
                      ''
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Mi Perfil</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Cerrar Sesión</MenuItem>
                </MenuList>
              </Menu>
            </Wrap>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}