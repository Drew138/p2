import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import ReactLogo from '../assets/logo.svg';
  
const Logo = (props: any) => {
  return (
      <div className="App">
          <img 
            src={ReactLogo} 
            alt="React Logo" 
            width={"22%"}
          />
      </div>
  );
};
  
export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Logo />
        <Text>© 2022 TranscriptAI. All rights reserved</Text>
      </Container>
    </Box>
  );
}