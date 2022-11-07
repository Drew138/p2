import { Container, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ReactLogo from "../assets/logo.svg";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Container
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Stack maxW={"6xl"} py={4} align="center">
        <img src={ReactLogo} alt="React Logo" width="15%" />
        <Text>{`Copyright © ${year} TranscriptAI. All rights reserved`}</Text>
      </Stack>
    </Container>
  );
}

