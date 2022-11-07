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
} from "@chakra-ui/react";
import ReactLogo from "../assets/logo.svg";
import { logOut } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Logo = (props: any) => {
  return (
    <div className="App">
      <img src={ReactLogo} alt="React Logo" width={"10%"} />
    </div>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logout = async () => {
    await logOut();
    localStorage.setItem("token", "");
    navigate("auth/login");
  };

  return (
    <>
      <Box bg={useColorModeValue("purple.100", "purple.700")} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box>
              <Logo />
            </Box>
          </HStack>
          <Flex alignItems={"center"}>
            <Wrap spacing={10}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={""} />
                </MenuButton>
                <MenuList>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
                </MenuList>
              </Menu>
            </Wrap>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
